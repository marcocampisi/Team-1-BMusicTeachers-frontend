<script>

export default {
    name: 'MainComponent',
}
</script>

<template>
    <div class="bg-app">
        <router-view></router-view>
    </div>
</template>

<style scoped lang="scss">
    .bg-app{
        min-height: 100vh;
        background-attachment: fixed;
        background-image: url('../assets/img/Template-1800px-1200px.png');
        background-position: center;
        background-repeat: no-repeat;
    }
</style>