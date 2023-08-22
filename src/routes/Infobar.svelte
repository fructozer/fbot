<script>
    import favicon from "$lib/assets/favicon.png"
    import { writable } from "svelte/store";
    import DropdownList from "./component/DropdownList.svelte";
    const sellectable = ["funayd", "fbot", "just4test", "mother"]
    const sellected = writable(sellectable[0])

</script>

<div class="infobar">
    <div class="logo">
        <img src={favicon} alt="fbot">
        <span class="title">FBOT</span>
    </div>
    <DropdownList table={sellectable} current={sellected} />
</div>


<style lang="stylus">
    .infobar{
        display: flex
        background: #313234
        justify-content: space-between
        .logo {
            display: flex
            height: 50px
            margin: 5px
        }
        .title {
            font-size: 25px
            line-height: 50px
            margin-left: 10px
        }
    }
</style>