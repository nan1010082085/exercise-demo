import { defineComponent } from "vue";
import CatchDb from './indexedDb'

const TestDb = defineComponent({
  setup() {
    const db = new CatchDb('catch', 1, 'store')
    console.log(db)

    // db.add(JSON.stringify({
    //   id: '1111',
    //   name: 'test',
    //   age: 18
    // }))

    return () => {
      return <div></div>
    }
  }
})

export default TestDb
