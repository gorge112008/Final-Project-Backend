import { faker } from "@faker-js/faker";

const testController = {
    test: (req, res, next) => {
        try {
            let first_name=faker.person.firstName();
            let last_name=faker.person.lastName();
            let email=faker.internet.email();
            let password=faker.internet.password();
            res.send({
              first_name,last_name,email,password
            });
          } catch (error) {
            next(error);
          }
    }
}

export default testController;