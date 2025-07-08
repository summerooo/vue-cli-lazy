<template>
  <div>
    <el-button type="primary" status="success" >Primary</el-button>
      <el-button status="success">Default</el-button>
      <el-button type="dashed" status="success">Dashed</el-button>
      <el-button type="outline" status="success">Outline</el-button>
      <el-button type="text" status="success">Text</el-button>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD HH:mm:ss"
        date-format="YYYY/MM/DD"
        time-format="hh:mm:ss"
      />
  <br />
  <el-select
      v-model="value"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    
  </div>
</template>
<script setup>

import { ref } from 'vue'
import { quantitiesOfPage1 } from '@/api/home'
const value = ref([])
const value1 = ref([])
const value2 = ref([])
const rangeValue =ref([])
const handleClickInfo = async () => {
  await quantitiesOfPage1()
    }
function getOptions(depth = 3, iterator = 1, prefix = '') {
  const length = 12
  const options = []
  for (let i = 1; i <= length; ++i) {
    if (iterator === 1) {
      options.push({
        value: `v-${i}`,
        label: `l-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${String(i)}`),
      })
    } else if (iterator === depth) {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
      })
    } else {
      options.push({
        value: `v-${prefix}-${i}`,
        label: `l-${prefix}-${i}`,
        disabled: i % 5 === 0,
        children: getOptions(depth, iterator + 1, `${prefix}-${i}`),
      })
    }
  }
  return options
}
const options = ref(getOptions())
const options11 = ref([
        {
          label: "Rubber Soul",
          key: "Rubber Soul",
          children: [
            {
              label: "Everybody's Got Something to Hide Except Me and My Monkey",
              key: "Everybody's Got Something to Hide Except Me and My Monkey"
            },
            {
              label: "Drive My Car",
              key: "Drive My Car",
              disabled: true
            },
            {
              label: "Norwegian Wood",
              key: "Norwegian Wood"
            },
            {
              label: "You Won't See",
              key: "You Won't See",
              disabled: true
            },
            {
              label: "Nowhere Man",
              key: "Nowhere Man"
            },
            {
              label: "Think For Yourself",
              key: "Think For Yourself"
            },
            {
              label: "The Word",
              key: "The Word"
            },
            {
              label: "Michelle",
              key: "Michelle",
              disabled: true
            },
            {
              label: "What goes on",
              key: "What goes on"
            },
            {
              label: "Girl",
              key: "Girl"
            },
            {
              label: "I'm looking through you",
              key: "I'm looking through you"
            },
            {
              label: "In My Life",
              key: "In My Life"
            },
            {
              label: "Wait",
              key: "Wait"
            }
          ]
        },
        {
          label: "Let It Be",
          key: "Let It Be Album",
          children: [
            {
              label: "Two Of Us",
              key: "Two Of Us"
            },
            {
              label: "Dig A Pony",
              key: "Dig A Pony"
            },
            {
              label: "Across The Universe",
              key: "Across The Universe"
            },
            {
              label: "I Me Mine",
              key: "I Me Mine"
            },
            {
              label: "Dig It",
              key: "Dig It"
            },
            {
              label: "Let It Be",
              key: "Let It Be"
            },
            {
              label: "Maggie Mae",
              key: "Maggie Mae"
            },
            {
              label: "I've Got A Feeling",
              key: "I've Got A Feeling"
            },
            {
              label: "One After 909",
              key: "One After 909"
            },
            {
              label: "The Long And Winding Road",
              key: "The Long And Winding Road"
            },
            {
              label: "For You Blue",
              key: "For You Blue"
            },
            {
              label: "Get Back",
              key: "Get Back"
            }
          ]
        }
      ])
console.log(options.value)
const handleUpdateValue = (value, options) => {
  console.log(value, options)
}

const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Salary',
      dataIndex: 'salary',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }, {
      title: 'Email',
      dataIndex: 'email',
    }, {
      title: 'Optional',
      slotName: 'optional'
    }];
    const data = [{
      key: '1',
      name: 'Jane Doe',
      first: 'Jane',
      last: 'Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com'
    }, {
      key: '2',
      name: 'Alisa Ross',
      first: 'Alisa',
      last: 'Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com'
    }, {
      key: '3',
      name: 'Kevin Sandra',
      first: 'Kevin',
      last: 'Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com'
    }, {
      key: '4',
      name: 'Ed Hellen',
      first: 'Ed',
      last: 'Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com'
    }, {
      key: '5',
      name: 'William Smith',
      first: 'William',
      last: 'Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com'
    }];
</script>
