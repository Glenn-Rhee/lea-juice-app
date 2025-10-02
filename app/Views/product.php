<?= $this->extend('layouts/main') ?>

<?= $this->section('title') ?>
Product Page
<?= $this->endSection() ?>

<?= $this->section('content') ?>
<h1 class="text-4xl font-semibold text-yellow-900">Data Produk</h1>

<?php foreach ($products as $product): ?>
    <p><?= $product['name'] ?> (<?= $product['id'] ?>)</p>
<?php endforeach; ?>
<?= $this->endSection() ?>