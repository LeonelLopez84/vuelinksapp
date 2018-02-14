<template>
  <div id="crud" class="crud">
     <h2>Tareas</h2> 
        <ul class="list-group task">
          <li v-for="task in tasks" class="list-group-item" :class="{editing: task.editing, completed: !task.pending }">
            <button class="btn btn-default" v-on:click="setPending(task)" ><span class="fa" :class="task.pending ? 'fa-square' : 'fa-check-square'"></span></button>

            <template v-if="!task.editing" >
            <span class="description">{{task.name}}</span>
            <div class="pull-right">
              <button class="btn btn-info" v-on:click="setEditing(task,1)">
                <span class="fa fa-edit"></span>
              </button>
               <button class="btn btn-danger" v-on:click.prevent="deleteTask(task)">
                <span class="fa fa-trash"></span>
              </button>
            </div>
            </template>

          <template v-else >
            <input v-model="task.name" type="text">
            <div class="pull-right">
              <button class="btn btn-default" v-on:click="setEditing(task,0)">
                <span class="fa fa-check"></span>
              </button>
               <button class="btn btn-default">
                <span class="fa fa-times" v-on:click="cancelEditing(task)"></span>
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
</div>
</form>
</div>
</template>

<script>
import Firebase from '../firebase'

let db = Firebase.database()
let tasksRef = db.ref('tasks')

export default {
  name: 'Crud',
  firebase: {
    tasks: tasksRef
  },
  methods: {
    setPending: function (task){
      var pending = task.pending ? 0 : 1
      tasksRef.child(task['.key']).child('pending').set(pending)
    },
    setEditing: function (task, editing) {
      if (!editing) {
        tasksRef.child(task['.key']).child('editing').set(editing)
        tasksRef.child(task['.key']).child('name').set(task.name)
      } else {
        tasksRef.child(task['.key']).child('editing').set(editing)
      }
    },
    cancelEditing: function (task) {
       tasksRef.child(task['.key']).child('editing').set(0)
    },
    addTask: function () {
      this.newTask.editing = false
      this.newTask.pending = true
      tasksRef.push(this.newTask)
      this.newTask.name = ''
    },
    deleteTask: function (task) {
      tasksRef.child(task['.key']).remove()
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
