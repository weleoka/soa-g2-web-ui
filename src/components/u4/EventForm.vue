<template>
  <div class="container-v" id="event-form-box">
    <div>
      <h4 v-if="isNew && wob.start">
        Skapa ny lektion på {{ Ut.toDateStr(wob.start) }}
      </h4>
      <h4 v-if="!isNew && wob.start">
        Ändrar lektionen på {{ Ut.toDateStr(wob.start) }}
      </h4>
    </div>

    <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
      <div class="container" id="form-container">
        <div class="container-v">
          <div class="form-group">
            <label>Distans URL</label>
            <Field
              name="firstName"
              type="text"
              class="form-control"
              :placeholder="wob.distanceUrl"
              :class="{ 'is-invalid': errors.distanceUrl }"
            />
            <div class="invalid-feedback">{{ errors.distanceUrl }}</div>
          </div>

          <div class="form-group">
            <label>Beskrivning</label>
            <Field
              name="description"
              type="text"
              class="form-control"
              :placeholder="wob.description"
              :class="{ 'is-invalid': errors.description }"
            />
            <div class="invalid-feedback">{{ errors.description }}</div>
          </div>
        </div>

        <div class="container-v">
          <div class="form-group">
            <label>Utrustning</label>
            <!--      <li v-for="(item, index) in resources" :key="index">
              <Field name="resources" type="checkbox" value="Projector"></Field> Projector
            </li>-->
            <div class="container inline-checkbox-group">
              <Field name="resources" type="checkbox" value="1"></Field>
              Projector
              <Field name="resources" type="checkbox" value="2"></Field>
              Computers
              <Field name="resources" type="checkbox" value="3"></Field> Time
              machine
            </div>
            <ErrorMessage name="resources" />
          </div>

          <div class="container-v form-group">
            <label>Tidspass</label>
            <TimeSlotDropdown @selection-event="onTimeSlotSelect" />
            <div class="invalid-feedback">{{ errors.timeslot }}</div>
          </div>

          <div class="container-v form-group">
            <label>Klassrum</label>
            <TimeSlotDropdown @selection-event="onClassRoomSelect" />
            <div class="invalid-feedback">{{ errors.timeslot }}</div>
          </div>

          <div class="container">
            <button class="btn-a" @click="$emit('submit')">
              Spara uppgifter
            </button>
            <button class="btn-a" @click="$emit('stop-event-edit-event')">
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import TimeSlotDropdown from "@/components/u4/TimeSlotDropdown.vue";
import { Ut } from "@/service/utils";
import { Event } from "@/entities/event";
import { ErrorMessage, Field, Form } from "vee-validate";
import { mapActions, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";

@Options({
  name: "EventForm",
  props: {
    formEvent: {
      type: Event,
      default: new Event(),
      required: true
    }
  },
  emits: ["stop-event-edit-event"],
  components: {
    Form,
    Field,
    ErrorMessage,
    TimeSlotDropdown
  },
  data() {
    return {
      schema: {
        resources: value => {
          if (Array.isArray(value) && value.length) {
            return true;
          }
          return "Välj utrustning";
        }
      },
      wob: {}, // working object
      Ut: Ut, // Make utilities available in template
      selectedTimeSlot: {} // holds the selected time slot
    };
  },
  computed: {
    //...mapState("bookingStore", ["resources"]),
    ...mapState("scheduleStore", ["timeSlots"]),
    isNew: state => !state.wob.tmpId // if tmpid isn't set we assume it's new
  },
  methods: {
    ...mapActions("bookingStore", ["refreshResources"]),

    /* Submits the form for post */
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },
    /*    onCancel() {
      this.$emit("cancel")
    },*/
    /* Event handler for when selected time slot changes */
    async onTimeSlotSelect(timeSlotId) {
      Ut.ld(`EventDetailBox->onTimeSlotSelect() ${timeSlotId}`);
      this.selectedTimeSlot = this.timeSlots[timeSlotId]; // fetch original slot info
      // todo: Move to do this in submitting form:
      this.wob.start = Ut.addMinutes(
        this.wob.start,
        this.selectedTimeSlot.from
      );
      this.wob.end = Ut.addMinutes(this.wob.start, this.selectedTimeSlot.to);
    }
  },
  mounted() {
    // We work only with a copy of the original event.
    this.wob = Object.assign(new Event(), this.formEvent);
    this.refreshResources(); // could be called somewhere else perhaps
  }
})
export default class EventForm extends Vue {}
</script>

<style scoped>
#form-container {
  /* important!! */
  width: 100%;
}
</style>
