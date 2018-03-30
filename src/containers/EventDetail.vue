<template>
    <div class="container">
        <div v-if="event">
            details page for {{event.title}}
        </div>
        <DateDecider :participants="participants" :suggestedDates="suggestedDates" v-if="event" />
    </div>
</template>

<script>
import DateDecider from "../components/Events/DateDecider.vue";
export default {
  name: "EventDetail",
  components: {
    DateDecider
  },
  computed: {
    event() {
      return this.$store.getters.loadEvent(this.$route.params.id);
    },
    suggestedDates() {
      return this.event.suggestedDates;
    },
    participants() {
      return this.event.participants;
    }
  },
  beforeMount() {}
};
</script>

<style scoped>

</style>