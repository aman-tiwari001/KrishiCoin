// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract P2PMarketplace {
    // Data structure for a listed agricultural item
    struct Item {
        uint256 listingId;
        string title;
        uint256 pricePerQuintal; // price in wei for 100 Kg
        uint256 totalStock; // total stock in kg
        uint256 maxDeliveryTime; // max time within the item will be delivered (in days)
        address payable farmer; // farmer's address
    }

    // Data structure for an order
    struct Order {
        uint256 orderId;
        uint256 listingId;
        uint256 quantity; // quantity in kg
        address payable buyer;
        uint256 totalPrice; // total price in wei
        bool isShipped;
        bool isConfirmed;
    }

    mapping(uint256 => Item) public items;
    mapping(uint256 => Order) public orders;

    event ItemListed(
        uint256 indexed listingId,
        address indexed farmer,
        string title,
        uint256 pricePerQuintal,
        uint256 maxDeliveryTime,
        uint256 totalStock
    );
    event OrderCreated(
        uint256 indexed orderId,
        uint256 indexed listingId,
        address indexed buyer,
        uint256 quantity,
        uint256 totalPrice
    );
    event OrderShipped(uint256 indexed orderId);
    event OrderConfirmed(uint256 indexed orderId, uint256 totalPrice, address indexed farmer);
    event BuyerWithdrawFunds(address buyer, uint256 orderId);

    // Modifier to check if the sender is the farmer
    modifier onlyFarmer(uint256 listingId) {
        require(items[listingId].farmer == msg.sender, "Only the farmer can perform this action.");
        _;
    }

    // Modifier to check if the sender is the buyer
    modifier onlyBuyer(uint256 orderId) {
        require(orders[orderId].buyer == msg.sender, "Only the buyer can perform this action.");
        _;
    }

    // Function for farmers to list new items
    function listItem(
        string memory _title,
        uint256 _pricePerQuintal,
        uint256 _totalStock,
        uint256 _listingId,
        uint256 _maxDeliveryTime
    ) public {
        require(_totalStock > 0, "Stock must be greater than zero.");
        require(_pricePerQuintal > 0, "Price per 50kg must be greater than zero.");
        require(_maxDeliveryTime > 0 && _maxDeliveryTime < 30, "Price per 50kg must be greater than zero.");

        items[_listingId] = Item({
            listingId: _listingId,
            title: _title,
            pricePerQuintal: _pricePerQuintal,
            totalStock: _totalStock,
            farmer: payable(msg.sender),
            maxDeliveryTime: _maxDeliveryTime
        });

        emit ItemListed(_listingId, msg.sender, _title, _pricePerQuintal, _maxDeliveryTime, _totalStock);
    }

    // Function for buyers to purchase an item
    function purchaseItem(
        uint256 _listingId,
        uint256 _orderId,
        uint256 _quantity
    ) public payable {
        Item storage item = items[_listingId];
        require(item.listingId != 0, "Item not found.");
        require(_quantity > 0 && _quantity <= item.totalStock, "Invalid quantity.");
        uint256 totalPrice = (item.pricePerQuintal * _quantity) / 100;
        require(msg.value == totalPrice, "Incorrect ETH amount sent.");

        // Create a new order
        orders[_orderId] = Order({
            orderId: _orderId,
            listingId: _listingId,
            quantity: _quantity,
            buyer: payable(msg.sender),
            totalPrice: totalPrice,
            isShipped: false,
            isConfirmed: false
        });

        // Update the stock for the listed item
        item.totalStock -= _quantity;

        emit OrderCreated(
            _orderId,
            _listingId,
            msg.sender,
            _quantity,
            totalPrice
        );
    }

    // Function for farmers to mark an order as shipped
    function shipOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.orderId != 0, "Order not found.");
        require(!order.isShipped, "Order already shipped.");
        require(items[order.listingId].farmer == msg.sender, "Only the farmer can ship this order.");
        uint256 maxDeliveryTime = block.timestamp + (items[order.listingId].maxDeliveryTime * 1 days);
        require(block.timestamp <= maxDeliveryTime, "Order can't be shipped after maximum delivery time");

        order.isShipped = true;

        emit OrderShipped(_orderId);
    }

    // Function for buyers to confirm receipt of order
    function confirmOrder(uint256 _orderId) public onlyBuyer(_orderId) {
        Order storage order = orders[_orderId];
        require(order.isShipped, "Order has not been shipped yet.");
        require(!order.isConfirmed, "Order already confirmed.");

        // Mark the order as confirmed
        order.isConfirmed = true;

        // Release the funds to the farmer
        Item storage item = items[order.listingId];
        item.farmer.transfer(order.totalPrice);

        emit OrderConfirmed(_orderId, order.totalPrice, item.farmer);
    }

    // Function for buyer to withdraw funds locked in contract if order is not shipped even after the max delivery time
    function withdrawBuyerFunds(uint256 _orderId) public onlyBuyer(_orderId) {
      Order storage order = orders[_orderId];
      uint256 maxDeliveryTime = block.timestamp + (items[order.listingId].maxDeliveryTime * 1 days);
      require(block.timestamp > maxDeliveryTime, "Funds can only be withdrawn after the max delivery time");
      require(!order.isShipped, "Item is shipped");
      payable(msg.sender).transfer(order.totalPrice);
      emit BuyerWithdrawFunds(msg.sender, _orderId);
    }

    // Fallback function to prevent ETH from getting stuck in the contract
    receive() external payable {
        revert("ETH cannot be sent directly to this contract.");
    }
}