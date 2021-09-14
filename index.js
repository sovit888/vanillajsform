class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
    this.validateOnBlur();
  }

  validateOnSubmit() {
    let self = this;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      self.fields.forEach((field) => {
        const input = document.querySelector(`#${field}`);
        self.validateFields(input);
      });
      if (this.checkValidate()) {
        this.handleSubmit();
      }
    });
  }
  validateOnBlur() {
    let self = this;
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);

      input.addEventListener("blur", (event) => {
        self.validateFields(input);
      });
    });
  }

  validateOnEntry() {
    let self = this;
    this.fields.forEach((field) => {
      const input = document.querySelector(`#${field}`);

      input.addEventListener("input", (event) => {
        self.validateFields(input);
      });
    });
  }

  validateFields(field) {
    if (field.value.trim() === "") {
      this.setStatus(
        field,
        `${field.getAttribute("name")} cannot be empty`,
        "error"
      );
    } else if (field.type === "email") {
      const re = /\S+@\S+\.\S+/;
      if (re.test(field.value)) {
        this.setStatus(field, null, "success");
      } else {
        this.setStatus(field, "Please enter valid email address", "error");
      }
    } else {
      this.setStatus(field, null, "success");
    }
  }

  setStatus(field, message, status) {
    if (status === "success") {
      field.nextElementSibling.innerText = message;
      field.classList.remove("is-invalid");
    }
    if (status === "error") {
      field.nextElementSibling.innerText = message;
      field.classList.add("is-invalid");
    }
  }
  checkValidate() {
    let status = true;
    for (let i = 0; i < this.fields.length; i++) {
      if (
        document
          .querySelector(`#${this.fields[i]}`)
          .classList.contains("is-invalid")
      ) {
        status = false;
        break;
      }
    }
    return status;
  }
  handleSubmit() {
    let data = {};
    this.fields.map((value) => {
      const input = document.querySelector(`#${value}`);
      data[value] = input.value;
    });

    this.hnadleClear();
  }
  hnadleClear() {
    this.fields.map((value) => {
      const input = document.querySelector(`#${value}`);
      input.value = "";
    });
  }
}

const form = document.querySelector("#form");
const fields = ["first-name", "last-name", "phone", "location", "message"];

const validator = new FormValidator(form, fields);
validator.initialize();
