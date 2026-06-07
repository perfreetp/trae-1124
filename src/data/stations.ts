import type { LineData } from '@/types';

export const linesData: LineData[] = [
  {
    id: 'line-1',
    name: '1号线',
    color: '#C8102E',
    stations: [
      { id: 's1-1', name: '火车站', line: '1号线', lineId: 'line-1', position: { x: 50, y: 80 }, deviceCount: 45, faultCount: 2 },
      { id: 's1-2', name: '人民广场', line: '1号线', lineId: 'line-1', position: { x: 130, y: 80 }, deviceCount: 52, faultCount: 1 },
      { id: 's1-3', name: '中山路', line: '1号线', lineId: 'line-1', position: { x: 210, y: 80 }, deviceCount: 38, faultCount: 0 },
      { id: 's1-4', name: '解放路', line: '1号线', lineId: 'line-1', position: { x: 290, y: 80 }, deviceCount: 42, faultCount: 3 },
      { id: 's1-5', name: '科技园', line: '1号线', lineId: 'line-1', position: { x: 370, y: 80 }, deviceCount: 48, faultCount: 0 },
      { id: 's1-6', name: '大学城', line: '1号线', lineId: 'line-1', position: { x: 450, y: 80 }, deviceCount: 46, faultCount: 1 },
      { id: 's1-7', name: '奥体中心', line: '1号线', lineId: 'line-1', position: { x: 530, y: 80 }, deviceCount: 50, faultCount: 0 },
      { id: 's1-8', name: '会展中心', line: '1号线', lineId: 'line-1', position: { x: 610, y: 80 }, deviceCount: 44, faultCount: 2 },
      { id: 's1-9', name: '商务中心', line: '1号线', lineId: 'line-1', position: { x: 690, y: 80 }, deviceCount: 54, faultCount: 1 },
      { id: 's1-10', name: '机场', line: '1号线', lineId: 'line-1', position: { x: 770, y: 80 }, deviceCount: 58, faultCount: 0 },
    ]
  },
  {
    id: 'line-2',
    name: '2号线',
    color: '#009944',
    stations: [
      { id: 's2-1', name: '北站', line: '2号线', lineId: 'line-2', position: { x: 80, y: 180 }, deviceCount: 40, faultCount: 1 },
      { id: 's2-2', name: '市政府', line: '2号线', lineId: 'line-2', position: { x: 160, y: 180 }, deviceCount: 45, faultCount: 0 },
      { id: 's2-3', name: '大剧院', line: '2号线', lineId: 'line-2', position: { x: 240, y: 180 }, deviceCount: 38, faultCount: 2 },
      { id: 's2-4', name: '博物馆', line: '2号线', lineId: 'line-2', position: { x: 320, y: 180 }, deviceCount: 42, faultCount: 0 },
      { id: 's2-5', name: '中心公园', line: '2号线', lineId: 'line-2', position: { x: 400, y: 180 }, deviceCount: 46, faultCount: 1 },
      { id: 's2-6', name: '体育馆', line: '2号线', lineId: 'line-2', position: { x: 480, y: 180 }, deviceCount: 50, faultCount: 0 },
      { id: 's2-7', name: '图书馆', line: '2号线', lineId: 'line-2', position: { x: 560, y: 180 }, deviceCount: 36, faultCount: 1 },
      { id: 's2-8', name: '软件园', line: '2号线', lineId: 'line-2', position: { x: 640, y: 180 }, deviceCount: 44, faultCount: 0 },
      { id: 's2-9', name: '东站', line: '2号线', lineId: 'line-2', position: { x: 720, y: 180 }, deviceCount: 52, faultCount: 2 },
    ]
  },
  {
    id: 'line-3',
    name: '3号线',
    color: '#F7A701',
    stations: [
      { id: 's3-1', name: '西站', line: '3号线', lineId: 'line-3', position: { x: 110, y: 280 }, deviceCount: 42, faultCount: 0 },
      { id: 's3-2', name: '商贸区', line: '3号线', lineId: 'line-3', position: { x: 190, y: 280 }, deviceCount: 48, faultCount: 1 },
      { id: 's3-3', name: '美食街', line: '3号线', lineId: 'line-3', position: { x: 270, y: 280 }, deviceCount: 38, faultCount: 0 },
      { id: 's3-4', name: '步行街', line: '3号线', lineId: 'line-3', position: { x: 350, y: 280 }, deviceCount: 44, faultCount: 2 },
      { id: 's3-5', name: '金融街', line: '3号线', lineId: 'line-3', position: { x: 430, y: 280 }, deviceCount: 52, faultCount: 0 },
      { id: 's3-6', name: '医院', line: '3号线', lineId: 'line-3', position: { x: 510, y: 280 }, deviceCount: 40, faultCount: 1 },
      { id: 's3-7', name: '学校', line: '3号线', lineId: 'line-3', position: { x: 590, y: 280 }, deviceCount: 46, faultCount: 0 },
      { id: 's3-8', name: '居民区', line: '3号线', lineId: 'line-3', position: { x: 670, y: 280 }, deviceCount: 38, faultCount: 1 },
      { id: 's3-9', name: '南站', line: '3号线', lineId: 'line-3', position: { x: 750, y: 280 }, deviceCount: 50, faultCount: 0 },
    ]
  }
];

export const allStations = linesData.flatMap(line => line.stations);
