<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{displayName}} - {{phone}} - {{code}}</h2>
    <form v-on:submit.prevent="singUp" >
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" v-model="auth.email" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" v-model="auth.pass" placeholder="Password">
      </div>
     <div class="form-group">
        <label for="exampleInputPassword1">Name</label>
        <input type="text" class="form-control" v-model="auth.name" placeholder="Name">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Lastname</label>
        <input type="text" class="form-control" v-model="auth.lastname" placeholder="Lastname">
      </div>
       <div class="form-group">
        <label for="exampleInputPassword1">Phone</label>
        <input type="text" class="form-control" v-model="auth.phone" placeholder="Lastname">
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary" >Registrar</button>
    </form>
    </div>
</template>

<script>
import toastr from 'toastr'
import Firebase from '../firebase'
import randomstring from 'randomstring'

let auth = Firebase.auth()
auth.signOut()

export default {
  name: 'Auth',
  methods: {
    singUp: function () {
      this.displayName = this.auth.name + ' ' + this.auth.lastname
      this.phone = this.auth.phone
      this.code = randomstring.generate(7)
      auth.createUserWithEmailAndPassword(this.auth.email, this.auth.pass)
      .then(function (user) {
        console.log('Creado')
      }).catch(e => {
        alert(e.message)
      })
      if (auth) {
        auth.onAuthStateChanged(function (user) {
          if (user) {
            user.updateProfile({
              displayName: this.displayName,
              phone: this.phone,
              code: this.code
            }).then(function () {
              console.log('Actualizado')
              toastr.success('Actualizado')
            }).catch(function (error) {
              console.log(error.message)
            })
          }
        })
      }
    }
  },
  data () {
    return {
      msg: 'Autenticando',
      displayName: '',
      phone: '',
      code: '',
      auth: {
        email: '',
        pass: '',
        name: '',
        lastname: '',
        phone: ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
