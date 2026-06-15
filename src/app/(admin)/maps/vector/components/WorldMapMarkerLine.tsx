'use client'
import BaseVectorMap from '@/components/VectorMap/BaseVectorMap'

import 'jsvectormap/dist/maps/world-merc'
import { getWorldMarkerLineOptions } from './data'

const WorldMapMarkerLine = () => {
  return <BaseVectorMap id="world-map-marker-line" options={getWorldMarkerLineOptions()} style={{ height: 360 }} />
}

export default WorldMapMarkerLine
