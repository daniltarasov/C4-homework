<template>
  <div class="container">
    <div class="col-sm-10">
      <h1>Задачи</h1>
      <h4 class="mt-4">Всего задач за все время: {{ allTasks }}</h4>
      <h4 class="mt-4">На текущий момент</h4>
      <table class="table table-dark table-stripped table-hover col-sm-10">
        <thead class="thead-light">
          <tr>
            <th>Всего задач</th>
            <th>Выполнено задач</th>
            <th>Не выполнено</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ in_total }}</td>
            <td>{{ done }}</td>
            <td>{{ undone }}</td>
          </tr>
        </tbody>
      </table>

      <confirmation :messag="confirmationMessage"
      :showDisAlert="showDismissibleAlert" v-on:closed="closeAlert"></confirmation>
<!--       <confirmation :messag="confirmationMessage"
      v-if="showConfirmation"></confirmation> -->
      <button type="button"
              id="task-add"
              class="btn btn-success btn-sm
              align-left d-block"
              v-b-modal.todo-modal>Добавить задачу
      </button>

      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Выполнена?</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.uid }}</td>
            <td>{{ todo.description }}</td>
            <td>
              <span v-if="todo.is_completed">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button type="button"
                        class="btn btn-secondary btn-sm"
                        v-b-modal.todo-update-modal
                        @click="updateTodo(todo)"
                        >
                    Обновить
                </button>
                &nbsp;
                <button type="button"
                        class="btn btn-danger
                        btn-sm" @click="deleteTodo(todo)">
                    X
                </button>
              </div>
            </td>
          </tr>
        </tbody>

      </table>

      <button type="button"
              id="task-add"
              class="btn btn-success btn-sm
              align-left d-block"
              @click="clearAll">Очистить LocalStorage
      </button>

      <b-modal ref="addTodoModal"
           id="todo-modal"
           title="Добавить задачу"
           hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
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
            <b-button type="submit" variant="primary">Добавить</b-button>
            <b-button type="reset" variant="danger">Сброс</b-button>
          </b-button-group>
        </b-form>
      </b-modal>

      <b-modal ref="updateTodoModal"
         id="todo-update-modal"
         title="Update"
         hide-footer>
        <b-form @submit="onUpdateSubmit" @reset="onUpdateReset"
            class="w-100">
          <b-form-group id="form-update-description-group"
              label="Описание:"
              label-for="form-update-description-input">
            <b-form-input id="form-update-description-input"
                type="text"
                v-model="updateTodoForm.description"
                required>
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-update-complete-group">
            <b-form-checkbox-group v-model="updateTodoForm.is_completed"
              id="form-update-checks">
              <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="primary">Обновить</b-button>
            <b-button type="reset" variant="danger">Сброс</b-button>
          </b-button-group>
        </b-form>
      </b-modal>

    </div>


  </div>
</template>

<style>
button#task-add {
  margin-top: 20px;
  margin-bottom: 20px;
}
h1, h4 {
  text-align: left;
}
td, th {
  text-align: center;
}

.todo-uid {
  text-align: center;
}
</style>

<script>

import Confirmation from './Confirmation.vue';

export default {
  name: 'Todo',
  data() {
    return {
      todos: [],
      addTodoForm: {
        description: '',
        is_completed: [],
      },
      updateTodoForm: {
        uid: 0,
        description: '',
        is_completed: [],
      },
      confirmationMessage: '',
      showDismissibleAlert: false,
      in_total: 0,
      done: 0,
      undone: 0,
      allTasks: 0,
    };
  },
  methods: {

    getTodos() {
      const storage = JSON.parse(localStorage.getItem('todos'));

      if (Array.isArray(storage)) {
        this.todos = storage;
        this.in_total = storage.length;
        const taskDone = storage.filter((item) => (item.is_completed === 'true'));
        this.done = taskDone.length;
        this.undone = this.in_total - this.done;
      } else {
        this.in_total = 0;
        this.done = 0;
        this.undone = 0;
      }
      const numAllTasks = Number(localStorage.getItem('allTasks'));
      if (numAllTasks !== undefined) {
        this.allTasks = numAllTasks;
      }
    },

    resetForm() {
      this.addTodoForm.description = '';
      this.addTodoForm.is_completed = [];
      this.updateTodoForm.description = '';
      this.updateTodoForm.is_completed = [];
    },

    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      const requestData = {
        description: this.addTodoForm.description,
        is_completed: this.addTodoForm.is_completed[0],
      };

      let storage = JSON.parse(localStorage.getItem('todos'));
      const taskNumberStr = localStorage.getItem('uid');
      let taskNumber = Number(taskNumberStr);
      let wrongUID = false;
      // проверка на наличие uid storage (для обеспечения уникальных id)
      if (taskNumberStr === null) {
        wrongUID = true;
      }
      if (storage === null || !Array.isArray(storage)) {
        storage = [];
        taskNumber = 0;
        wrongUID = false;
      }
      if (wrongUID) {
        this.confirmationMessage = 'Кто-то стер хранилище UID. Больше ничего добавлять не буду. Очистите все.';
        this.showDismissibleAlert = true;
      } else {
        localStorage.setItem('uid', taskNumber + 1);
        storage.push({
          uid: taskNumber + 1,
          description: this.addTodoForm.description,
          is_completed: this.addTodoForm.is_completed[0],
        });
        localStorage.setItem('todos', JSON.stringify(storage));
        localStorage.setItem('uid', taskNumber + 1);

        let numAllTasks = Number(localStorage.getItem('allTasks'));
        if (numAllTasks === undefined) {
          numAllTasks = 0;
        }
        localStorage.setItem('allTasks', numAllTasks + 1);
        this.getTodos();
        this.confirmationMessage = `Задача "${requestData.description}" добавлена`;
        this.showDismissibleAlert = true;
        this.resetForm();
      }
    },

    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    },

    updateTodo(todo) {
      this.updateTodoForm = todo;
    },

    onUpdateSubmit(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      // eslint-disable-next-line
      let storage = JSON.parse(localStorage.getItem('todos'));

      /*eslint-disable*/
      let foundUID = false;
      for (let note of storage) {
        if (note.uid === this.updateTodoForm.uid) {
            note.description = this.updateTodoForm.description;
            note.is_completed = this.updateTodoForm.is_completed[0];
            foundUID = true;
        }
      }
      /*eslint-disable*/

      // проверка на валидный UID
      if (!foundUID) {
        this.confirmationMessage = 'Запись с заданным UID не найдена!';
        this.showDismissibleAlert = true;

      } else {
        localStorage.setItem('todos', JSON.stringify(storage));
        this.getTodos();
        this.confirmationMessage = 'Задача обновлена';
        this.showDismissibleAlert = true;
      }
    },

    onUpdateReset(event) {
      event.preventDefault();
      this.$refs.updateTodoModal.hide();
      this.resetForm();
      this.getTodos();
    },

    deleteTodo(todo) {
      const storage = JSON.parse(localStorage.getItem('todos'));
      const newList = [];
      let foundUID = false;
      let rightNote = false;
      for (const note of storage) {
        if (note.uid !== todo.uid) {
          newList.push(note);
        } else {
          // проверка на uid и соответвие записи в storage
          foundUID = true;
          if (note.description === todo.description && note.is_completed === todo.is_completed) {
            rightNote = true;
          }
        }
      }
      if (!foundUID) {
        this.confirmationMessage = 'Запись с заданным UID не найдена!';
        this.showDismissibleAlert = true;
      } else if (!rightNote) {
        this.confirmationMessage = 'Запись не соответствует сохраненной. Удалять не буду.';
        this.showDismissibleAlert = true;
      }
        else {
        localStorage.setItem('todos', JSON.stringify(newList));
        this.getTodos();
        this.confirmationMessage = 'Задача удалена из списка';
        this.showDismissibleAlert = true;
      }

    },

    closeAlert() {
      this.showDismissibleAlert = false;
      console.log('получил');
    },

    clearAll() {
      localStorage.removeItem('todos');
      localStorage.removeItem('uid');
      localStorage.removeItem('allTasks');
      this.todos = [];
      this.in_total = 0;
      this.done = 0;
      this.undone = 0;
      this.allTasks = 0;
    }

  },

  components: {
    confirmation: Confirmation,
  },

  created() {
    this.getTodos();
  },

};

</script>
