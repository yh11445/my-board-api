import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

// @Query('date', ParseDatePipe) date: Date,
@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any) {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException("Validation failed (Date string is expected)");
    }

    return date;
  }
}
@Injectable()
export class ParseBooleanPipe implements PipeTransform {
  transform(value: string | boolean) {
    if (typeof value === "string") return value === "true" ? true : false;
    return value;
  }
}
