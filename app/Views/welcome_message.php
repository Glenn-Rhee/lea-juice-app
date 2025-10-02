<?= $this->extend('layouts/main') ?>

<?= $this->section('title') ?>
Product Page
<?= $this->endSection() ?>

<?= $this->section('content') ?>

<marquee behavior="" direction="left">
    <h1 class="text-4xl font-bold text-red-900">Hello world</h1>
</marquee>
<details class="dropdown">
    <summary class="btn m-1">open or close</summary>
    <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
    </ul>
</details>
<?= $this->endSection() ?>