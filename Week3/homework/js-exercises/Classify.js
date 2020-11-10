/* eslint-disable constructor-super */
/* eslint-disable max-classes-per-file */
// In this exercise you'll read a little story. It's your job to turn the characters in it into classes and instantiate the class into the characters you read about!

// # STORY
// Abdulkareem is a 35 year old man, that lives in Riyadh. He has a wife and 3 children. As a day job he's a construction worker, that makes houses. He likes to eat dates and smoke water pipe.
// Abdulkareem has a horse, named Adel. The horse is 15 years old and has the color brown. Usually the horse eats grass or helps transport materials for Abdulkareem.
// And they lived happily ever after!

// After reading this story, you have to:
// Create a class for Adbulkareem and Adel
// Instantiate those classes to create an Abdulkareem object and Adel object

class Person {
  constructor(
    name,
    age,
    gender,
    city,
    spouse,
    childrenNumber,
    job,
    jobDescribe,
    favFood,
    habit,
  ) {
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.city = city;
    this.spouse = spouse;
    this.childrenNumber = childrenNumber;
    this.job = job;
    this.jobDescribe = jobDescribe;
    this.favFood = favFood;
    this.habit = habit;
  }

  hasSpouse() {
    if (this.gender === 'man' || this.gender === 'male') {
      if (!this.spouse || this.spouse === 'no spouse') {
        return `He has no spouse,`;
      }
      return `He has a wife `;
    }
    if (this.gender === 'woman' || this.gender === 'female') {
      if (!this.spouse || this.spouse === 'no spouse') {
        return `She has no spouse,`;
      }
      return `She has a Husband `;
    }
  }

  hasChildren() {
    if (
      !this.spouse ||
      this.childrenNumber === '0' ||
      this.childrenNumber === 0
    ) {
      return `does not have children, `;
    }
    if (this.childrenNumber === 1) {
      return `a child, `;
    }
    return `${this.childrenNumber} children,`;
  }

  hasJob() {
    if (this.gender === 'man' || this.gender === 'male') {
      if (this.job) {
        return `He's a ${this.job}, that ${this.jobDescribe},`;
      }
      return `He doesn't have job ,`;
    }

    if (this.gender === 'woman' || this.gender === 'female') {
      if (this.job) {
        return `She's a ${this.job}, that ${this.jobDescribe},`;
      }
      return `She doesn't have job ,`;
    }
  }
}

class Animal {
  constructor(name, species, age, color, favFood, job) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.color = color;
    this.job = job;
    this.favFood = favFood;
  }
}

const Abdulkareem = new Person(
  'Abdulkareem',
  35,
  'man',
  'Riyadh',
  'wife',
  3,
  'Constructor worker',
  'makes houses',
  'dates',
  'smoke water pipe',
);

const adel = new Animal(
  'Adel',
  'horse',
  15,
  'brown',
  'grass',
  'transport material',
);

// console.log(Abdulkareem);
// console.log(Adel);

console.log(`${Abdulkareem.name} is a ${Abdulkareem.age} year old ${
  Abdulkareem.gender
}, that lives in ${
  Abdulkareem.city
}. ${Abdulkareem.hasSpouse()} and ${Abdulkareem.hasChildren()}. As a day job ${Abdulkareem.hasJob()}. He likes to eat ${
  Abdulkareem.favFood
} and ${Abdulkareem.habit}.

${Abdulkareem.name} has a ${adel.species}, named ${adel.name}. The ${
  adel.species
} is ${adel.age} years old and has the color ${
  adel.color
}. Usually the horse eats ${adel.favFood} or helps ${adel.job} for ${
  Abdulkareem.name
}.

And they lived happily ever after!`);
