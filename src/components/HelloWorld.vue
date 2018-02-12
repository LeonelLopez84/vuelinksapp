<template>
  <div class="hello">
     <h1>Vue and Firebase</h1>
    <div class="card">
      <div class="card-header">
        <h3>Add A link</h3> 
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addUser" class="form-inline">
          <div class="form-group">
            <label for="">Titulo</label>
            <input class="form-control" v-model="newUser.name" placeholder="title" type="text">
          </div>
          <div class="form-group">
            <label for="">Author</label>
            <input class="form-control" v-model="newUser.lastname" placeholder="author" type="text">
          </div>
          <div class="form-group">
            <label for="">URL</label>
            <input class="form-control" v-model="newUser.email" placeholder="link" type="text">
          </div>
          <button type="submit" class="btn btn-success">Add</button>
        </form>
      </div>

      <hr>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Links List</h3>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
             <tr v-for="user in users">
              <td>{{user.name}}</td>
              <td>{{user.lastname}}</td>
              <td>{{user.email}}</td>
              <td><button class="btn btn-danger" type="button" name="button" v-on:click="deleteUser(user)">
               <i class="fa fa-trash-o"></i>
              </button></td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import toastr from 'toastr'
import Firebase from '../firebase'

let db = Firebase.database()

let usersRef = db.ref('users')
let emailsRef = db.ref('emails')

export default {
  name: 'Hello',
  firebase: {
    users: usersRef,
    emails: emailsRef
  },
  methods: {
    addUser: function () {
      this.newUser.datetime = firebase.database.ServerValue.TIMESTAMP
      var mail = this.escapedEmail(this.newUser.email)
      var user = this.newUser
      var key = ''
      console.log(mail)
      emailsRef.once('value', function (snapshot) {
        if (!snapshot.hasChild(mail)) {
          key = usersRef.push(user).getKey()
          emailsRef.child(mail).set(key)
        } else {
          alert('El usuario ya existe')
        }
      })
      this.newUser.name = ''
      this.newUser.lastname = ''
      this.newUser.email = ''
    },
    deleteUser: function (user) {
      usersRef.child(user['.key']).remove()
      this.deleteEmail(this.escapedEmail(user.email))
      toastr.success('Removed')
    },
    escapedEmail: function (email) {
      return email.replace('.', ',')
    },
    deleteEmail: function (email) {
      emailsRef.child(email).remove()
    }
  },
  data () {
    return {
      newUser: {
        name: '',
        lastname: '',
        email: ''
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
