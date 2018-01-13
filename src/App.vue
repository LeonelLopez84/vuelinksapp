<template>
  <div id="app" class="container">

    <h1>Vue and Firebase</h1>
    <div class="card">
      <div class="card-header">
        <h3>Add A link</h3>
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="addLink" class="form-inline">
          <div class="form-group">
            <label for="">Titulo</label>
            <input class="form-control" v-model="newLink.title" placeholder="title" type="text">
          </div>
          <div class="form-group">
            <label for="">Author</label>
            <input class="form-control" v-model="newLink.author" placeholder="author" type="text">
          </div>
          <div class="form-group">
            <label for="">URL</label>
            <input class="form-control" v-model="newLink.url" placeholder="link" type="text">
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
                <th>Title</th>
                <th>Author</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
             <tr v-for="link in links">
              <td><a v-bind:href="link.url" target="_blank">{{link.title}}</a></td>
              <td>{{link.author}}</td>
              <td><button class="btn btn-danger" type="button" name="button" v-on:click="deleteLink(link)">
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

import Firebase from 'firebase'
import toastr from 'toastr'

let config = { apiKey: 'AIzaSyC9pI72_JQPvX_H4YY6qyO72iVsRh4Ug7U',
  authDomain: 'vuejsfirebase-22357.firebaseapp.com',
  databaseURL: 'https://vuejsfirebase-22357.firebaseio.com',
  projectId: 'vuejsfirebase-22357',
  storageBucket: '',
  messagingSenderId: '711809900922'}

let app = Firebase.initializeApp(config)
let db = app.database()

let linksRef = db.ref('links')

export default {
  name: 'app',
  firebase: {
    links: linksRef
  },
  methods: {
    addLink: function () {
      linksRef.push(this.newLink)
      this.newLink.title = ''
      this.newLink.author = ''
      this.newLink.url = ''
    },
    deleteLink: function (link) {
      linksRef.child(link['.key']).remove()
      toastr.success('Removed')
    }
  },
  data () {
    return {
      newLink: {
        title: '',
        author: '',
        url: ''
      }
    }
  }
}
</script>

<style>
#app {
  
}
</style>
