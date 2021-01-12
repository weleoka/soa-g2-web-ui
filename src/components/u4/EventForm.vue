<template>
  <div class="container-v" id="event-form-box">
    <h4 v-if="isNew && wob.start">
      Skapa ny lektion på {{ Ut.toDateStr(wob.start) }}
    </h4>
    <h4 v-if="!isNew && wob.start">
      Ändrar lektionen på {{ Ut.toDateStr(wob.start) }}
    </h4>
    <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
      <div class="form-row">
        <div class="form-group col">
          <TimeSlotDropdown @selection-event="onTimeSlotSelect" />
          <!-- <label>Tidspass</label>
              <Field
                      name="timeslot"
                      as="select"
                      class="form-control"
                      :class="{ 'is-invalid': errors.timeslot }"
                    >
                    </Field>-->
          <div class="invalid-feedback">{{ errors.timeslot }}</div>
        </div>
        <div class="form-group col-5">
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
        <div class="form-group col-5">
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

      <!--      <li v-for="(item, index) in resources" :key="index">
        <Field name="resources" type="checkbox" value="Projector"></Field> Projector
      </li>-->
      <Field name="resources" type="checkbox" value="1"></Field> Projector
      <Field name="resources" type="checkbox" value="2"></Field> Computers
      <Field name="resources" type="checkbox" value="3"></Field> Time machine
      <ErrorMessage name="resources" />
      <br />
      <div class="container">
        <button class="btn-a" @click="$emit('submit')">
          Spara uppgifter
        </button>
        <button class="btn-a" @click="$emit('stop-event-edit-event')">
          Avbryt
        </button>
      </div>
    </Form>
  </div>
</template>

<script lang="ts">
import TimeSlotDropdown from "@/components/u4/TimeSlotDropdown.vue";
import { Ut } from "@/service/utils";
import { Event } from "@/entities/event";
import { ErrorMessage, Field, Form } from "vee-validate";
import { mapState } from "vuex";
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
      Ut: Ut
    };
  },
  computed: {
    //...mapState("bookingStore", ["resources"]),
    ...mapState("scheduleStore", ["timeSlots"]),
    isNew: state => !state.wob.tmpId // if tmpid isn't set we assume it's new
  },
  methods: {
    //...mapActions("bookingStore", ["refreshResources"]),

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
      const slot = this.timeSlots[timeSlotId]; // fetch original slot info
      this.wob.start = Ut.addMinutes(this.wob.start, slot.from);
      this.wob.end = Ut.addMinutes(this.wob.start, slot.to);
    }
  },
  mounted() {
    // We work only with a copy of the original event.
    this.wob = Object.assign(new Event(), this.formEvent);
    //this.refreshResources(); // could be called somewhere else perhaps
  }
})
export default class EventForm extends Vue {}
</script>

<style scoped>
#event-form-box {
  overflow: auto;
  height: 331px;
  max-height: 331px;
  padding: inherit;
}
</style>
