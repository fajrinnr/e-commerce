<template>
  <div class="login-page">
    <div class="login-wrap">
      <div class="login-html">
      <h1><i class="fas fa-bolt"></i> ARDUISHOP <i class="fas fa-bolt"></i></h1>
        <input id="tab-1" type="radio" name="tab" class="sign-in" checked>
        <label for="tab-1" class="tab">Sign In</label>
        <input id="tab-2" type="radio" name="tab" class="sign-up">
        <label for="tab-2" class="tab">Sign Up</label>
        <div class="login-form">
          <div class="sign-in-htm">
            <form @submit.prevent="login">
              <div class="group">
                <label for="user" class="label">Email</label>
                <input v-model="formLogin.email" id="user" type="email" class="input">
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input v-model="formLogin.password" id="pass" type="password"
                class="input" data-type="password">
              </div>
              <div class="group">
                <div class="vld-parent">
                  <loading :active.sync="isLoading" 
                  :can-cancel="true" 
                  :is-full-page="fullPage" :loader="'bars'" :color="'#1161EE'"></loading>
                  </div>     
                <input type="submit"
                class="button" style="cursor: pointer" value="Sign In">
              </div>
            </form>
            <div class="hr"></div>
          </div>
          <div class="sign-up-htm">
            <form @submit.prevent="register">
              <div class="group">
                <label for="user" class="label">Name</label>
                <input v-model="formRegis.name" id="user" type="text" class="input">
              </div>
              <div class="group">
                <label for="pass" class="label">Email Address</label>
                <input v-model="formRegis.email" id="pass" type="email" class="input">
              </div>
              <div class="group">
                <label for="pass" class="label">Password</label>
                <input v-model="formRegis.password" id="pass"
                type="password" class="input" data-type="password">
                </div>
              <div class="group">
                <div class="vld-parent">
                  <loading :active.sync="isLoading" 
                  :can-cancel="true" 
                  :is-full-page="fullPage" :loader="'bars'" :color="'#1161EE'"></loading>
                  </div>
                <input type="submit" class="button" style="cursor: pointer" value="Sign Up">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div>
      <img src="" alt="">
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'LoginPage',
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      formLogin: {
        email: null,
        password: null,
      },
      formRegis: {
        name: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$axios.post('/login', {
        email: this.formLogin.email,
        password: this.formLogin.password,
      })
        .then((result) => {
          this.isLoading = false;
          localStorage.setItem('name', result.data.data.name);
          localStorage.setItem('token', result.data.token);
          this.$store.dispatch('checkLogin');
          this.$store.dispatch('listProducts');
          this.formLogin.email = '';
          this.formLogin.password = '';
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully',
          });
          if (result.data.data.role === 'admin') {
            localStorage.setItem('admin', 'admin');
            this.$store.dispatch('checkAdmin');
            this.$router.push({ name: 'Admin' });
          } else {
            this.$router.push({ name: 'Home' });
          }
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.response.data.message}`,
            showConfirmButton: false,
            timer: 1200,
          });
        });
    },
    register() {
      this.isLoading = true;
      this.$axios.post('/register', {
        name: this.formRegis.name,
        email: this.formRegis.email,
        password: this.formRegis.password,
      })
        .then((result) => {
          this.isLoading = false;
          localStorage.setItem('name', result.data.user.name);
          localStorage.setItem('token', result.data.token);
          this.$store.dispatch('checkLogin');
          this.formRegis.name = '';
          this.formRegis.email = '';
          this.formRegis.password = '';
          console.log(result);
          this.$router.push({ name: 'Home' });
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: 'success',
            title: `Welcome ${result.data.user.name}`,
          });
        })
        .catch((err) => {
          this.isLoading = false;
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: `${err.response.data[0].msg}`,
            showConfirmButton: false,
            timer: 1800,
          });
        });
    },
  },
};
</script>

<style  scoped>
  body{
    margin:0;
    color:#6a6f8c;
    background:#c8c8c8;
  }
  *,:after,:before{box-sizing:border-box}
  .clearfix:after,.clearfix:before{content:'';display:table}
  .clearfix:after{clear:both;display:block}
  a{color:inherit;text-decoration:none}

  .login-wrap{
    width:100%;
    margin:auto;
    min-height:670px;
    position:relative;
    box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
  }
  .login-html{
    width:50%;
    height:100%;
    transform: translateX(50%);
    position: relative;
    padding:90px 0px 50px 0px;
  }
  .login-html .sign-in-htm,
  .login-html .sign-up-htm{
    top:0;
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    transform:rotateY(180deg);
    backface-visibility:hidden;
    transition:all .4s linear;
  }
  .login-html .sign-in,
  .login-html .sign-up,
  .login-form .group .check{
    display:none;
  }
  .login-html .tab,
  .login-form .group .label,
  .login-form .group .button{
    text-transform:uppercase;
  }
  .login-html .tab{
    font-size:22px;
    margin-right:15px;
    padding-bottom:5px;
    margin:0 15px 10px 0;
    display:inline-block;
    border-bottom:2px solid transparent;
  }
  .login-html .sign-in:checked + .tab,
  .login-html .sign-up:checked + .tab{
    color:#1161ee;
    border-color:#1161ee;
  }
  .login-form{
    min-height:345px;
    position:relative;
    perspective:1000px;
    transform-style:preserve-3d;
  }
  .login-form .group{
    margin-bottom:15px;
  }
  .login-form .group .label,
  .login-form .group .input,
  .login-form .group .button{
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    width:100%;
    color:black;
    display:block;
  }
  .login-form .group .input{
    border: 1px solid black;
    padding:15px 20px;
    border-radius:25px;
    background:rgba(255,255,255,.1);
  }
  .login-form .group .button{
    padding:15px 20px;
    border-radius:25px;
    background:rgba(255,255,255,.1);
  }
  .login-form .group input[data-type="password"]{
    /* text-security: circle; */
    -webkit-text-security:circle;
  }
  .login-form .group .label{
    color:black;
    font-size:12px;
  }
  .login-form .group .button{
    background:#1161ee;
  }
  .login-form .group label .icon{
    width:15px;
    height:15px;
    border-radius:2px;
    position:relative;
    display:inline-block;
    background:rgba(255,255,255,.1);
  }
  .login-form .group label .icon:before,
  .login-form .group label .icon:after{
    content:'';
    width:10px;
    height:2px;
    background:#fff;
    position:absolute;
    transition:all .2s ease-in-out 0s;
  }
  .login-form .group label .icon:before{
    left:3px;
    width:5px;
    bottom:6px;
    transform:scale(0) rotate(0);
  }
  .login-form .group label .icon:after{
    top:6px;
    right:0;
    transform:scale(0) rotate(0);
  }
  .login-form .group .check:checked + label{
    color:#fff;
  }
  .login-form .group .check:checked + label .icon{
    background:#1161ee;
  }
  .login-form .group .check:checked + label .icon:before{
    transform:scale(1) rotate(45deg);
  }
  .login-form .group .check:checked + label .icon:after{
    transform:scale(1) rotate(-45deg);
  }
  .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
    transform:rotate(0);
  }
  .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
    transform:rotate(0);
  }

  .hr{
    height:2px;
    margin:60px 0 50px 0;
    background:rgba(255,255,255,.2);
  }
  .foot-lnk{
    text-align:center;
  }
</style>
