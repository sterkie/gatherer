<template>
    <div>
        <div class="deciderContainer box">
            <div class="columns">
                <div class="column is-one-quarter">
                </div>
                <div class="column has-text-centered" v-for="(date,index) in suggestedDates" :key="index">{{date | date}}</div>
            </div>
            <div class="columns" v-for="pa in participants" :key="pa.id">
                <div class="column is-one-quarter person-column has-text-centered">{{pa.name}}</div>
                <div class="column has-text-centered" v-for="(date, index) in suggestedDates" :key="index">
                    <input type="checkbox" :value="pa.availableDates ? pa.availableDates.indexOf(suggestedDates[index]) != -1 : false" @click="setUnset(pa, suggestedDates[index])">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ["participants", "suggestedDates"],
  computed: {},
  methods: {
    setUnset(pa, date) {
      //   console.log(pa, date);
      let index = pa.availableDates.indexOf(date);
      if (index === -1) {
        pa.availableDates.push(date);
      } else {
        pa.availableDates.splice(index, 1);
      }
    }
  },
  beforeMount() {
    // if (this.suggestedDates) {
    //   const sd = this.suggestedDates;
    const ad = [];
    //   sd.map(date => {
    //     const obj = { [date]: false };
    //     ad.push(obj);
    //   });
    const par = this.participants;
    for (var key in par) {
      if (!par.hasOwnProperty(key)) continue;
      var obj = par[key];
      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) continue;
        obj.availableDates = ad;
      }
    }
    // }
  }
};
</script>

<style scoped>
.deciderContainer {
  width: 480px;
  margin: 32px auto;
  font-size: 12px;
}

.person-column {
  border-right: 1px solid aqua;
  font-size: 12px;
}

#app {
  font-size: 12px;
}

.cell {
  background-color: rgb(120, 216, 120);
  margin: 2px;
}
</style>