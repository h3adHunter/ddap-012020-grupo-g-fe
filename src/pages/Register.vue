<template>
  <div id="register">
    <div id="description">
      <img src="../assets/favicon.png" width="100px" />
      <h1 style="color: #161a1f;">Registrate</h1>
      <p>
        Bienvenido a Abastify, la confianza del barrio en tu casa.
      </p>
    </div>
    <div id="form">
      <b-form @submit="onRegister">
        <b-row>
          <b-col sm="6">
            <b-form-group
              description=""
              label="Nombre"
              label-for="firstName"
              invalid-feedback="errors.firstName[0]"
              :state="errors.firstName.length === 0">
              <b-form-input id="firstName" type="text" v-model="form.firstName" placeholder="Pablo" autocomplete="off"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              description=""
              label="Apellido"
              label-for="lastName"
              invalid-feedback="errors.lastName[0]"
              :state="errors.lastName.length === 0">
              <b-form-input id="lastName" type="text" v-model="form.lastName" placeholder="Neruda" autocomplete="off"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

        <b-form-group
          description=""
          label="Email"
          label-for="email"
          :invalid-feedback="errors.email[0]"
          :state="errors.email.length === 0">
          <b-form-input id="email" type="text" v-model="form.email" placeholder="usuario@mailbox.com" autocomplete="off"></b-form-input>
        </b-form-group>
        
        <b-form-group
          description=""
          label="Contraseña"
          label-for="password"
          :invalid-feedback="errors.password[0]"
          :state="errors.password.length === 0">
          <b-row>
            <b-col sm="10">
              <b-form-input id="password" :type="passwordType" v-model="form.password" placeholder="**********"></b-form-input>
            </b-col>
            <b-col sm="2">
              <i class="fas" style="margin-top: 10px;" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i>
            </b-col>
          </b-row>
        </b-form-group>

        <p style="margin-top: 15px; text-align: center;">
          No tenemos Términos ni Condiciones, simplemente abastecete.
        </p>
        <b-button id="register-button" type="submit">Registrarse</b-button>
      </b-form>
    </div>
  </div>
  <!-- <div>
    <b-row>
      <b-col></b-col>
      <b-col>
        <h2>Registrate</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="firstName">Nombre</label>
            <input
              type="text"
              v-model="user.firstName"
              v-validate="'required'"
              name="firstName"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('firstName') }"
            />
            <div
              v-if="submitted && errors.has('firstName')"
              class="invalid-feedback"
            >{{ errors.first('firstName') }}</div>
          </div>
          <div class="form-group">
            <label for="lastName">Apellido</label>
            <input
              type="text"
              v-model="user.lastName"
              v-validate="'required'"
              name="lastName"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('lastName') }"
            />
            <div
              v-if="submitted && errors.has('lastName')"
              class="invalid-feedback"
            >{{ errors.first('lastName') }}</div>
          </div>
          <div class="form-group">
            <label for="username">Usuario</label>
            <input
              type="text"
              v-model="user.username"
              v-validate="'required'"
              name="username"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('username') }"
            />
            <div
              v-if="submitted && errors.has('username')"
              class="invalid-feedback"
            >{{ errors.first('username') }}</div>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              v-model="user.password"
              v-validate="{ required: true, min: 6 }"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('password') }"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="invalid-feedback"
            >{{ errors.first('password') }}</div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="false">Registrarse</button>
            <img
              v-show="true"
              src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
            /> 
            <router-link to="/login" class="btn btn-link">Cancelar</router-link>
          </div>
        </form>
      </b-col>
      <b-col></b-col>
    </b-row>
  </div> -->
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      errors: {
        firstName: [],
        lastName: [],
        email: [],
        password: []
      },
      submitted: false,
      hidePassword: true
    };
  },
  computed: {
    passwordType() {
      return this.hidePassword ? 'password' : 'text'
    },
    passwordIcon() {
      return this.hidePassword ? 'fa-eye' : 'fa-eye-slash'
    }
  },
  methods: {
		onRegister() {
			this.submitted = true
			// this.$validator.validate().then(valid => {
			// 		if (valid) {
			// 			console.log("Valido");
						
			// 				// this.register(this.user);
			// 		}
			// });
		}
	}
};
</script>

<style scoped>
div#register {
  align-items: center;
  background-color: #e2e2e5;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80vh;
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
  border-radius: 0px 5px 5px 0px;
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
  margin-bottom: 20px;
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