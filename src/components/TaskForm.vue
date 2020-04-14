<template>
    <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <p>{{ whatToDo }}</p>
      <b-form-group id="form-description-group"
            label="Описание:"
            label-for="form-description-input">
        <b-form-input id="form-description-input"
              type="text"
              v-model="addTodoForm.description"
              required
              placeholder="Завести задачу">
        </b-form-input>
      </b-form-group>
      <b-form-group id="form-complete-group">
        <b-form-checkbox-group v-model="addTodoForm.is_completed" id="form-checks">
          <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button-group>
        <b-button type="submit" variant="primary">{{ whatToDo }}</b-button>
        <b-button type="reset" variant="danger">Сброс</b-button>
      </b-button-group>
    </b-form>
</template>

<script>


export default
{
  props:
  {
    addTodoForm: Object,
    whatToDo: String,
  },

  methods: {

    onSubmit() {
      console.log('submit');
      const sendData = {
        description: this.addTodoForm.description,
        is_completed: this.addTodoForm.is_complited[0],
      };
      this.$emit('submit', sendData);
    },

    onReset() {
      const sendData = {
        description: 'пересылаю',
        is_completed: this.addTodoForm.is_complited[0],
      };
      console.log('reset');
      this.$emit('reset', sendData);
    },

  },


};

</script>
