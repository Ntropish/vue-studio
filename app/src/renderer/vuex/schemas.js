import { normalize, schema } from 'normalizr'


const computed = new schema.Entity('computed')

const method = new schema.Entity('method')

const Components = new schema.Entity('components', {
  computed: [computed],
  methods: [methods]
})
