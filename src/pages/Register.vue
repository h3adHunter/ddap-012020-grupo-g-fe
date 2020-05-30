<template>
  <div id="register">
    <div id="description">
      <img src="../assets/favicon.png" width="100px" />
      <h1 style="color: #161a1f;">Registrate</h1>
      <p>
        Bienvenido a Abastify, la confianza del barrio en tu casa.
      </p>
    </div>
    <b-overlay :show="loading" rounded="sm">
      <div id="form">
        <b-form @submit.prevent="handleRegister">
          <b-row>
            <b-col sm="6">
              <b-form-group
                label="Nombre"
                label-for="firstName"
                :invalid-feedback="errors.first('Nombre')"
                :state="!submitted && errors.has('Nombre')">
                <b-form-input 
                  id="firstName"
                  name="Nombre" 
                  type="text" 
                  v-model="form.firstName" 
                  v-validate="'required'"
                  placeholder="Pablo" 
                  autocomplete="off">
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group
                label="Apellido"
                label-for="lastName"
                :invalid-feedback="errors.first('Apellido')"
                :state="!submitted && errors.has('Apellido')">
                <b-form-input 
                  id="lastName" 
                  name="Apellido" 
                  type="text" 
                  v-model="form.lastName" 
                  v-validate="'required'"
                  placeholder="Neruda" 
                  autocomplete="off">
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            label="Email"
            label-for="email"
            :invalid-feedback="errors.first('Email')"
            :state="!submitted && errors.has('Email')">
            <b-form-input 
              id="email" 
              name="Email"
              type="text" 
              v-model="form.email" 
              v-validate="'required|email'"
              placeholder="pablo.neruda@gmail.com" 
              autocomplete="off">
            </b-form-input>
          </b-form-group>
          
          <b-form-group
            label="Contraseña"
            label-for="password"
            :invalid-feedback="errors.first('Contraseña')"
            :state="!submitted && errors.has('Contraseña')">
            <b-form-input 
              id="password" 
              name="Contraseña"
              type="password" 
              v-model="form.password" 
              v-validate="'required'"
              placeholder="**********"
              ref="password">
            </b-form-input>
          </b-form-group>

          <b-form-group
            label="Repetir contraseña"
            label-for="repeatedPassword"
            :invalid-feedback="errors.first('Repetir_contraseña')"
            :state="!submitted && errors.has('Repetir_contraseña')">
            <b-form-input 
              id="repeatedPassword" 
              name="Repetir_contraseña"
              type="password" 
              v-model="form.repeatedPassword" 
              v-validate="'required|confirmed:password'"
              placeholder="**********">
            </b-form-input>
          </b-form-group>

          <p style="margin-top: 10px; text-align: center;">
            No tenemos Términos ni Condiciones, simplemente abastecete.
          </p>
          
          <b-button id="register-button" type="submit">Registrarse</b-button>
          
        </b-form>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Register",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: ""
      },
      submitted: false,
      loading: false
    };
  },
  computed: { },
  methods: {
    ...mapActions('account', ['register']),
		handleRegister() {
      this.submitted = true
      this.loading = true
      this.$validator.validate().then(valid => {
        if (valid) {
          this.register(this.form)
        }
        this.loading = false
      })
		}
	}
}
</script>

<style scoped>
div#register {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 89vh;
}

div#register div#description {
  text-align: center;
  background-color: #ffffff;
  width: 250px;
  padding: 35px;
  border-radius: 5px 0px 0px 5px;
  box-shadow: -20px 0px 30px 0px #666
}

div#register div#description h1,
div#register div#description p {
  margin: 0;
}

div#register div#description p {
  font-size: 0.8em;
  color: #5a5a5a;
  margin-top: 10px;
}

div#register div#form {
  background-color: #0e1013;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 20px 0px 30px 0px #666;
  color: #f3f4f5;
  width: 400px;
  padding: 35px;
}



div#register div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
}

div#register div#form ::placeholder {
  color: #bbbbbb;
  opacity: 1;
}

div#register div#form button#register-button {
  background-color: #ffffff;
  color: #333333;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#register div#form button:hover#register-button {
  background-color: #cccccc;
  color: #000000;
}

div#register div#form button#register-button {
  background-color: #173541;
  color: #cccccc;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#register div#form button:hover#register-button {
  background-color: #cccccc;
  color: #000000;
}

@media screen and (max-width: 600px) {
  div#register {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#register div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#register div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }
}
</style>