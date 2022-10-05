import { ClassConstructor, plainToClass } from 'class-transformer';

export class MapperUtil {
  public static map<T, V>(cls: ClassConstructor<T>, object: V): T {
    return plainToClass<T, Partial<V>>(cls, object, {
      excludeExtraneousValues: true,
    });
  }

  public static async mapAsync<T, V>(cls: ClassConstructor<T>, object: V): Promise<T> {
    return plainToClass<T, Partial<V>>(cls, object, {
      excludeExtraneousValues: true,
    });
  }

  public static mapList<T, V>(cls: ClassConstructor<T>, array: V[]): T[] {
    return plainToClass<T, V>(cls, array, {
      excludeExtraneousValues: true,
    });
  }

  public static copyNotNullData(entity, dto) {
    for (const key in dto) {
      if (entity.hasOwnProperty(key) && dto[key] !== undefined && dto[key] !== null) {
        entity[key] = dto[key];
      }
    }
  }

  public static mapAll<T, V>(cls: ClassConstructor<T>, object: V): T {
    return plainToClass<T, Partial<V>>(cls, object);
  }
}
