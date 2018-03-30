<template>
    <div class="container">
        <form @submit.prevent="createEvent">
            <div class="field">
                <label for="" class="label">What?</label>
                <input type="text" placeholder="What is the reason for the event?" v-model="newEvent.title" class="input" />
            </div>
            <div class="field">
                <label for="" class="label">Where?</label>
                <input type="text" placeholder="Where will the event take place?" v-model="newEvent.location" class="input" />
            </div>
            <div class="field">
                <label for="" class="label">When?</label>
                <DatePicker :multi="true" v-model="newEvent.suggestedDates" />
            </div>
            <div class="field">
                <textarea class="textarea" placeholder="Provide some more information about the event..." v-model="newEvent.body"></textarea>
            </div>
            <div class="field">
                <button class="button is-info is-outlined">Create Event</button> or
                <button class="button is-danger is-outlined" @click="cancelCreate">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
import DatePicker from "./DatePicker.vue";
export default {
  name: "CreateEvent",
  components: { DatePicker },
  data() {
    return {
      newEvent: {
        title: "",
        location: "",
        suggestedDates: [],
        body: ""
      }
    };
  },
  methods: {
    createEvent() {
      const newEvent = {
        title: this.newEvent.title,
        location: this.newEvent.location,
        creatorId: this.user.id,
        creatorName: this.user.name,
        body: this.newEvent.body,
        suggestedDates: this.newEvent.suggestedDates,
        status: "voting"
      };
      this.$store.dispatch("createEvent", newEvent);
    },

    cancelCreate() {
      this.$router.go(-1);
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style scoped>

</style>