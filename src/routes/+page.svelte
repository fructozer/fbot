<script>
    import Sidebar from "./Sidebar.svelte";
    import "./+page.stylus"
    import Infobar from "./Infobar.svelte";
    import Workspace from "./Workspace.svelte";
    import Footer from "./Footer.svelte";
</script>
<svelte:head>
    <link rel="stylesheet" href="font.css">
</svelte:head>

<section class="app">
    <Workspace />
    <Footer />
    <Sidebar />
    <Infobar />
</section>

<style>
</style>