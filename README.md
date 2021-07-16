# financial-challenge-nodejs <img align="right" height="30" src="https://github.com/soareslssa/soareslssa/blob/main/images/javascript.png"><img align="right" height="30" src="https://github.com/soareslssa/soareslssa/blob/main/images/nodejs.png">

In this application i provide the following APIs:

 Checking account balance
- Include entry - with positive value and description
- Include output release - with positive value and description
- The balance must never be negative
- Query

## Registration of financial assets - CRUD (Create, Read, Update, Delete)
 Must contain fields:
- Name, market price (up to 8 decimal places), type
- Valid types are RV, RF and BACKGROUND.
- All fields are mandatory

## Asset movement - buying, selling and consulting
- Must contain the following fields:
- Asset, quantity (up to 2 decimal places) and movement value.
- Purchases and sales must generate entries in the checking account reflecting the amount spent or
gain.
- Sales must be validated to ensure that the total amount of an asset does not remain
negative (you can't sell what you don't have).
- Purchases and sales must be made for the amount informed at the entry of operations, and
may not match the price of the asset.

## Position query. A list of records, one for each asset, each record must contain:
- Asset name, type, total quantity, total market value, yield
- Total quantity: sum of the quantities purchased minus the quantities sold in the
active
- Total market value: total quantity multiplied by the asset's market price
- Yield: market price divided by the average purchase price
- Profit: sum of sales values ​​minus asset purchases values

