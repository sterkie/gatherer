<template>
    <div class="container">
        <h3 class="title">EVENTS!</h3>
        <div v-for="event in events" :key="event.id" class="box">
            {{event.title}}
        </div>
    </div>
</template>

<script>
export default {
  name: "Events",
  computed: {
    events() {
      return this.$store.getters.events;
    }
  }
};
</script>

<style scoped>

</style>