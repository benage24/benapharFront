export class GenericValidatorMessages {
  public static genericStringMessage(title?: string) {
    return { message: `${title} must not be a string !` };
  }
  public static genericNumberMessage(title?: string) {
    return { message: `${title} must not be a number !` };
  }

 public static genericEmptyMessage(title?: string) {
    return { message: `${title}  ne doit pas être vide !` };
  }
  public static genericEmptyArray(title?: string) {
    return { message: `${title} must not be empty , save at least one ${title?.toLocaleLowerCase()}!` };
  }
}
