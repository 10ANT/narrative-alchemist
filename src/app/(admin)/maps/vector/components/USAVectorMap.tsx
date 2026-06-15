'use client'
import BaseVectorMap from '@/components/VectorMap/BaseVectorMap'

import 'jsvectormap'
import 'jsvectormap/dist/maps/us-aea-en'
import { getUSAMapOptions } from './data'

const USAVectorMap = () => {
  return <BaseVectorMap id="usa-map" options={getUSAMapOptions()} style={{ height: 360 }} />
}

export default USAVectorMap
