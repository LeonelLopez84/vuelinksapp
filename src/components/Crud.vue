<template>
  <div class="crud">
     <h2>Tareas</h2> 
        <ul class="list-group task">
          <li class="list-group-item" v-for="task in tasks">
            <a href=""><span class="fa fa-square"></span></a>
            <span class="description">{{task.name}}</span>
            <div class="pull-right">
              <a href="">
                <span class="fa fa-edit"></span>
              </a>
               <button class="btn btn-danger" v-on:click.prevent="deleteTask(task)">
                <span class="fa fa-trash"></span>
              </button>
            </div>
          </li>
        </ul>
        <hr>
  <form v-on:submit.prevent="addTask()">
  <div class="form-group">
    <label for="inputPassword2" class="sr-only">Tarea</label>
    <input type="text" v-model="newTask.name" class="form-control" id="inputPassword2" placeholder="Tarea">
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
    addTask: function () {
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
<style scoped>
#app {
  
}
</style>
