<template>
  <div id="crud" class="crud">
     <h2>Tareas</h2> 
        <ul class="list-group task">
          <li v-for="task in tasks" class="list-group-item" :class="{editing: task.editing, completed: !task.pending }">
            <button class="btn btn-default" v-on:click="setPending(task)" >
              <app-icon :img="task.pending ? 'square' : 'check-square'"></app-icon>
                </button>
            <template v-if="!task.editing" >
            <span class="description">{{task.name}} {{getUser(task.idUser)}}</span>
            <div class="pull-right">
              <button class="btn btn-info" v-on:click="toggleEditing(task)">
               <app-icon img="pencil"></app-icon>
              </button>
               <button class="btn btn-danger" v-on:click.prevent="deleteTask(task)">
                <app-icon img="trash"></app-icon>
              </button>
            </div>
            </template>

          <template v-else >
            <input v-model="task.name" type="text">
            <div class="pull-right">
              <button class="btn btn-default" v-on:click="toggleEditing(task)">
                 <app-icon img="check"></app-icon>
              </button>
               <button class="btn btn-default">
                  <app-icon img="times"></app-icon>
              </button>
            </div>
          </template> 
          </li>
        </ul>
        <hr>
  <form v-on:submit.prevent="addTask()">
  <div class="form-group">
    <label for="inputPassword2" class="sr-only">Tarea</label>
    <input type="text" v-model="newTask.name" class="form-control" required="required" placeholder="Tarea">
  </div>
   <div class="form-group">
  <button type="submit" class="btn btn-primary mb-2">Crear Nueva Tarea</button>
  <Item></Item>
</div>
</form>
</div>
</template>

<script>
import Vue from 'vue'
import Firebase from '../firebase'
import Item from './Item'

let db = Firebase.database()
let tasksRef = db.ref('tasks')
const usersRef = db.ref('users')

Vue.component('app-icon', {
  template: '<span :class="cssClasses"></span>',
  props: ['img'],
  computed: {
    cssClasses: function () {
      return 'fa fa-' + this.img
    }
  }
})

export default {
  name: 'Crud',
  components: {
    Item
  },
  firebase: {
    tasks: tasksRef
  },
  methods: {
    setPending: function (task) {
      var pending = task.pending ? 0 : 1
      tasksRef.child(task['.key']).child('pending').set(pending)
    },
    toggleEditing: function (task) {
      var editing = task.editing ? 0 : 1
      tasksRef.child(task['.key']).child('editing').set(editing)
      tasksRef.child(task['.key']).child('name').set(task.name)
    },
    cancelEditing: function (task) {
      tasksRef.child(task['.key']).child('editing').set(0)
    },
    addTask: function () {
      this.newTask.editing = false
      this.newTask.pending = true
      this.newTask.idUser = 1
      tasksRef.push(this.newTask)
      this.newTask.name = ''
    },
    deleteTask: function (task) {
      tasksRef.child(task['.key']).remove()
    },
    getUser: function (key) {
      var user = ''
      usersRef.child(key).once('value', snap1 => {
        let userRef = usersRef.child(snap1.key)
        userRef.once('value', snap2 => {
          user = snap2.val()
        })
      })
      return user
    }
  },
  data () {
    return {
      newTask: {
        name: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss">
#crud {
  .completed{
      text-decoration: line-through;
  }
}
</style>
