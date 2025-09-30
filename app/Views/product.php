<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tes</title>
</head>

<body>
    <h1>Hello page product</h1>
    <?php foreach ($products as $product): ?>
        <span><?= $product["id"] ?></span>
    <?php endforeach; ?>
</body>

</html>