import Sequelize from 'sequelize';
import _ from 'lodash';
import Faker from 'faker';

const Conn = new Sequelize(
  'relay',
  'timothybarmann',
  'postgres', {
    dialect: 'postgres',
    host: 'localhost'
  }
);

const Person = Conn.define('person', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Post = Conn.define('post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Relationships
Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({force: true}).then( ()=> {
  _.times(10, () => {
    return Person.create({
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    });
  });
});

export default Conn;
