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

    <Form @submit="onSubmit">
      <div class="container" id="form-container">
        <div class="container-v">
          <div class="form-group">
            <label
              >Distans URL
              <Field
                name="distanceUrl"
                type="text"
                as="input"
                class="form-control"
                v-model="wob.distanceUrl"
              />
            </label>
          </div>

          <div class="form-group">
            <label
              >Beskrivning
              <Field
                name="description"
                type="text"
                class="form-control"
                v-model="wob.description"
              />
            </label>
          </div>

          <div class="form-group">
            <label
              >Kontaktperson
              <Field
                name="contactName"
                type="text"
                class="form-control"
                v-model="wob.contactName"
              />
            </label>
          </div>
          <!--  @click="$emit('submit')" -->
          <div class="container">
            <button type="submit" class="btn-a">
              Spara uppgifter
            </button>
            <button class="btn-a" @click="onCancel">
              Avbryt
            </button>
          </div>
        </div>

        <div class="container-v">
          <div class="container-v form-group">
            <label
              >Tidspass
              <TimeSlotDropdown
                class="form-select"
                :preselected="timeslotId"
                @selection-event="onTimeSlotSelect"
              />
            </label>
          </div>

          <div class="container-v form-group">
            <label
              >Klassrum
              <RoomDropdown
                class="form-select"
                :preselected="roomId"
                @selection-event="onRoomSelect"
              />
            </label>
          </div>

          <div class="form-group">
            <label
              >Utrustning
              <div class="container">
                <div class="col" v-for="column in cbColumns" :key="column">
                  <div
                    class="item-container"
                    v-for="item in column"
                    :key="item"
                  >
                    <label class="checkbox-label" :for="item.id">
                      <Field
                        class="checkbox"
                        :id="item.id"
                        :name="`resources.${item.id}`"
                        type="checkbox"
                        :value="item.id"
                      />
                      {{ item.type.toLowerCase() }}
                    </label>
                  </div>
                </div>
              </div>
            </label>
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
import { mapGetters, mapState } from "vuex";
import { Options, Vue } from "vue-class-component";
import RoomDropdown from "@/components/u4/RoomDropdown.vue";

@Options({
  name: "EventForm",
  props: {
    formEvent: {
      type: Event,
      default: new Event(),
      required: true
    }
  },
  emits: ["stop-event-edit-event", "form-submit-event"],
  components: {
    Form,
    Field,
    ErrorMessage,
    TimeSlotDropdown,
    RoomDropdown
  },
  data() {
    return {
      wob: {}, // working object
      Ut: Ut, // Make utilities available in template
      timeslotId: null, // hold value here as dropdown is separate component)
      roomId: null, // hold value here as dropdown is separate component)
      checkboxCols: 2
    };
  },
  computed: {
    ...mapState("bookingStore", ["resourceArr", "roomArr"]),
    ...mapGetters("scheduleStore", ["getTimeslotById"]),
    isNew: state => !state.wob.tmpId, // if tmpid isn't set we assume it's new
    cbColumns() {
      const columns = [];
      const mid = Math.ceil(this.resourceArr.length / this.checkboxCols);
      for (let col = 0; col < this.checkboxCols; col++) {
        columns.push(this.resourceArr.slice(col * mid, col * mid + mid));
      }
      return columns;
    }
  },
  methods: {
    /* Submits the form for post */
    onSubmit(formData, actions) {
      formData.rooms = [this.roomId]; // yes, backend accepts multiple
      const timeslot = this.getTimeslotById(this.timeslotId);
      if (Ut.isSet(timeslot)) {
        formData.start = Ut.addMinutes(this.wob.start, timeslot.from);
        formData.end = Ut.addMinutes(this.wob.start, timeslot.to);
        formData.timeslot = timeslot.code;
      }
      alert(Ut.pf(formData));
      // Don't mutate wob instead create new object of the others merged.
      const eventData = { ...this.wob, ...formData };
      //const eventData = Object.assign({}, this.wob, formData);
      console.log(Ut.pf(eventData));
      this.wob = {};
      this.timeslotId = null;
      this.roomId = null;
      this.$emit("form-submit-event", eventData);
    },

    onCancel() {
      this.wob = {};
      this.timeslotId = null;
      this.roomId = null;
      console.log(`EventForm->onCancel()`);
      this.$emit("stop-event-edit-event");
    },

    async onTimeSlotSelect(timeslotId) {
      console.log(`EventDetailBox->onTimeSlotSelect() ${timeslotId}`);
      this.timeslotId = timeslotId;
    },

    onRoomSelect(roomId) {
      console.log(`EventDetailBox->onRoomSelect() ${roomId}`);
      this.roomId = roomId; // todo: allow multiple rooms
    }
  },
  mounted() {
    // We work only with a copy of the original event.
    //this.wob = Object.assign(new Event(), this.formEvent);
    const event = new Event();
    this.wob = { ...event, ...this.formEvent };

    if (Ut.isSet(this.wob.rooms)) {
      this.roomId = 1; //this.wob.rooms[0]; // todo: support multiple rooms
    } else {
      this.roomId = 1;
    }
    if (Ut.isSet(this.wob.start)) {
      this.timeslotId = 1; //this.wob.start; // todo: identify closest timeslot to start.
    } else {
      this.timeslotId = 1;
    }
  }
})
export default class EventForm extends Vue {}
</script>

<style scoped>
#form-container {
  /* important!! */
  width: 100%;
}

.item-container {
  padding-top: 0.5em;
}
.checkbox-label {
  display: block;
  padding-left: 15px;
  text-indent: -15px;
}

.checkbox {
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0;
  vertical-align: bottom;
  position: relative;
  top: -1px;
}

label {
  width: 100%;
}
</style>

<!--
{{ item.description }}
              <div v-for="(item, index) in resourceArr" :key="index">
              </div>
-->

<!--            <Field name="timeslotId" :value="timeslotId" type="hidden" />-->
<!--            <Field name="rooms" :value="selectedRoom" type="hidden" />-->

<!--
@submit.prevent="onSubmit"
:validation-schema="schema"
  v-slot="{ errors }"
  :initial-errors="initialErrors"

              <Field
          name="distance-url"
          as="input"
          class="form-control"
          :placeholder="wob.distanceUrl"
          :class="{ 'is-invalid': errors.distanceUrl }"
        />
        <ErrorMessage name="distance-url" />
-->

/*const schema = yup.object().shape({ email: yup .string() .required() .email(),
name: yup.string().required(), password: yup .string() .required() .min(8)
resources: value => { if (Array.isArray(value) && value.length) { return true; }
return "Välj utrustning för 17!"; } });*/
