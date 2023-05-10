import { Contact } from "./../Model/Contact";
import { faker } from "@faker-js/faker";

const FakerService = {
  RandomFullName(): string {
    return faker.name.fullName();
  },

  RandomNum(min: number = 1, max: number = 10): number {
    return faker.datatype.number({ min: min, max: max });
  },

  RandomWords(num?: number): string {
    return faker.lorem.words(num);
  },

  RandomSentence(num?: number): string {
    return faker.lorem.sentence(num);
  },

  RandomParagraphs(num?: number): string {
    return faker.lorem.paragraphs(num);
  },

  RandomUID(): string {
    return faker.datatype.uuid();
  },

  RandomAvatar(): string {
    return faker.internet.avatar();
  },

  RandomUserName(): string {
    return faker.internet.userName();
  },

  RandomEmail(): string {
    return faker.internet.email();
  },

  RandomPW(): string {
    return faker.internet.password();
  },

  RandomPhoneNum(): string {
    return faker.phone.number();
  },

  RandomSex(): string {
    return faker.name.sex();
  },

  RandomDate(): string {
    return faker.date.recent().toISOString();
  },

  RandomDOB(options?: {
    min?: number | undefined;
    max?: number | undefined;
    mode?: "age" | "year" | undefined;
    refDate?: string | number | Date | undefined;
  }): Date {
    return faker.date.birthdate(options);
  },

  RandomBoolean(): boolean {
    return faker.datatype.boolean();
  },

  RandomAddress(): string {
    return faker.address.streetAddress(true);
  },

  FakeDataArray(fakeOBJ: Function, min?: number, max?: number): any[] {
    const tempRandom = this.RandomNum(min, max);
    var obj: any[] = [];

    for (var i = 0; i < tempRandom; i++) {
      var tempOBJ = fakeOBJ();
      obj.push(tempOBJ);
    }

    return obj;
  },

  Contact(): Contact {
    let NewContact = new Contact();
    NewContact.Name = this.RandomFullName();
    NewContact.PhoneNum = this.RandomPhoneNum();
    NewContact.Email = this.RandomEmail();
    NewContact.Address = this.RandomAddress();

    return NewContact;
  },
};

export default FakerService;
