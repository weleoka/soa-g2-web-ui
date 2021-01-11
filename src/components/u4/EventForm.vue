<template>
  <div>
    <p>Lektion på {{ formEvent.start.format("dddd DD MMMM") }}:</p>
    <Form :validation-schema="schema" @submit="onSubmit" v-slot="{ errors }">
      <div class="form-row">
        <div class="form-group col">
          <label>Title</label>
          <Field
            name="title"
            as="select"
            class="form-control"
            :class="{ 'is-invalid': errors.title }"
          >
            <option value=""></option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
          </Field>
          <div class="invalid-feedback">{{ errors.title }}</div>
        </div>
        <div class="form-group col-5">
          <label>First Name</label>
          <Field
            name="firstName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.firstName }"
          />
          <div class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="form-group col-5">
          <label>Last Name</label>
          <Field
            name="lastName"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.lastName }"
          />
          <div class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
      </div>

      <TimeSlotDropdown @selection-event="onTimeSlotSelect" />

      <Field name="drink" type="checkbox" value="Milk"></Field> Milk
      <Field name="drink" type="checkbox" value="Tea"></Field> Tea
      <Field name="drink" type="checkbox" value="Coffee"></Field> Coffee
      <ErrorMessage name="drink" />
    </Form>
  </div>
</template>

<script>
import TimeSlotDropdown from "@/components/u4/TimeSlotDropdown.vue";
import { Ut } from "@/service/utils";
import { Event } from "@/entities/event";
import { Form, Field, ErrorMessage } from "vee-validate";
import { mapState } from "vuex";

export default {
  name: "EventForm",
  props: {
    vcObj: {
      type: Event,
      default: null,
      required: true
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
    TimeSlotDropdown
  },
  data() {
    return {
      schema: {
        drink: value => {
          if (Array.isArray(value) && value.length) {
            return true;
          }
          return "You must choose a drink";
        }
      },
      formEvent: {}
    };
  },
  computed: {
    ...mapState("scheduleStore", ["timeSlots"])
  },
  methods: {
    onSubmit(values) {
      alert(JSON.stringify(values, null, 2));
    },

    /* Event handler for when selected time slot changes */
    async onTimeSlotSelect(timeSlotId) {
      Ut.ld(`EventDetailBox->onTimeSlotSelect()`);
      const slot = this.timeSlots[timeSlotId];
      Ut.pp(slot);
      this.formEvent.start = Ut.addMinutes(this.formEvent.start, slot.from);
      this.formEvent.end = Ut.addMinutes(this.formEvent.start, slot.to);
    }
  },
  mounted() {
    // Copy object. Assuming primitive properties only.
    this.formEvent = Object.assign(new Event(), this.vcObj);
  }
};
</script>
