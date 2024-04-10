import {IPoint} from "@do-while-for-each/math";

/**
 *!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 *!!                                          !!
 *!!   Здесь наличие импортов допустимо, но   !!
 *!!   импорт с указанием на индексный файл   !!
 *!!   может спровоцировать возникновение     !!
 *!!   ошибки циклической зависимости.        !!
 *!!                                          !!
 *!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */


export const width = 350;
export const height = 300;

// Тип фигуры для интерполяции
export enum InterpFigureType {
  Line = 1,
  Polygon = 2,
}

export const interpFigureType = InterpFigureType.Polygon;
export const tension = 1;

export const points: IPoint[] = [
  [15.574704096838559, 93.20440028274061],
  [95.75053229695231, 39.085716247665914],
  [168.90438197210824, 114.06593557512497],
  [252.0933972871967, 32.07033128014973],
  [320.24285125729375, 94.20659813525981],
  [189.95713043206842, 227.49891251820554],
  [15.574704096838559, 93.20440028274061],
]
