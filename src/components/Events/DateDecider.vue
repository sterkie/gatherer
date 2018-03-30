<template>
    <div>
        <div class="deciderContainer box">
            <div class="columns">
                <div class="column is-one-quarter">

                </div>
                <div class="column has-text-centered" v-for="(date,index) in suggestedDates" :key="index">{{date}}</div>
            </div>
            <div class="columns" v-for="pa in participants" :key="pa.id">
                <div class="column is-one-quarter person-column has-text-centered">{{pa.name}}</div>
                <div class="column has-text-centered" v-for="(date, index) in suggestedDates" :key="index">
                    <input type="checkbox" :value="pa.availableDates.indexOf(suggestedDates[index]) != -1" @click="setUnset(pa, suggestedDates[index])">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["participants", "suggestedDates"],
  methods: {
    setUnset(pa, date) {
      console.log(pa, date);
      let index = pa.availableDates.indexOf(date);
      if (index === -1) {
        pa.availableDates.push(date);
      } else {
        pa.availableDates.splice(index, 1);
      }
    }
  },
  computed: {
    event() {
      this.$store.getters.event(this.$route.params.id);
    },
    suggestedDates() {
      this.event.suggestedDates;
    },
    participants() {
      this.event.participants;
    }
  }
};
</script>

<style scoped>

</style>