import { defineComponent, onMounted, ref } from 'vue';
import styles from './index.module.scss';

// abstract class Home {
//   name: string;
//   constructor(private n: string) {
//     this.name = n
//   }

//   getName() {
//     return this.n
//   }

//   abstract load(): void;
// }

// class Tc extends Home {
//   age: number;
//   constructor(n: string, public a: number) {
//     super(n)
//     this.age = a;
//   }

//   getUser() {
//     return {
//       name: this.name,
//       age: this.age
//     }
//   }

//   load() {
//     console.log('load');
//   }
// }

const HomeComponent = defineComponent({
  name: 'HomeComponent',
  setup() {

    // const d = new Tc('tc', 18);
    // console.log(d.getUser());
    // d.load();

    return () => {
      return (
        <div class={styles.wrapper}>

        </div>
      );
    };
  }
});

export default HomeComponent;
