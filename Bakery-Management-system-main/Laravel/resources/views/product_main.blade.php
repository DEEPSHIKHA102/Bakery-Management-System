<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Crud</title>
</head>
<body>
    <form action="product_storage" method="post" enctype="multipart/form-data">
        @csrf
    <label for="name">Prdouct Name:</label>
    <input type="text" name="title">

    <label for="price">Product Price</label>
    <input type="number" name="price">

    <label for="description">Product Description</label>
    <textarea name="description" name="description" cols="30" rows="10"></textarea>

    <label for="image">Image</label>
    <input type="file" name="image" >

    <label for="catrgory">Product Category</label>
    <select name="category" >
        <option value="cake">Cake</option>
        <option value="sandwich">Sandwich</option>
    </select>

    <label for="quantity">Product Quantity</label>
    <input type="number" name="quantity">

    <label for="weight">Product Weight</label>
    <input type="number" name="weight" >

    <label for="available">Product Availabilty</label>
    <input type="checkbox" name="available">

    <label for="discount">Product Discount</label>
    <input type="number" name="discount">

    <label for="featured">Featured Product</label>
    <input type="checkbox" name="featured">
    <input type="submit" value="submit">
</form>
</body>
</html>