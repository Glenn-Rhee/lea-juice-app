<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $this->renderSection('title') ?></title>

    <!-- Panggil CSS sekali saja -->
    <link rel="stylesheet" href="<?= base_url('css/output.css') ?>">
</head>

<body>
    <!-- Konten view -->
    <?= $this->renderSection('content') ?>
    <script src="<?= base_url('js/script.js') ?>"></script>
</body>

</html>