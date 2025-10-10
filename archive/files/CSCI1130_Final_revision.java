/** 
 * CSCI1130 Revision Notes
 * @author: Ryan Chan
 */
import java.io.*;
import java.util.*;

// interface InterfaceIdentifier -> same as abstract, usage: class ... implements interface1, ...
/*
abstract class Subject (){
    protected abstract double calGpa();
}

public interface Exchange {
    boolean apply (String university);
  }

public class RocketScience extends Subject implements Exchange{
  protected double calGpa(){
    return 4.0;
  }
  
  public boolean apply (String university){
    return true;
  }
}
*/
class someClass extends Final_revision{
  /*
  for ( ; ; ) {// consider always true
  ;
  */
  //break; break the loop
  //continue; restart
  public someClass(){
  do {
    int a = super.demo++;
    // do something here once before check
    } while(true);

  // or use while directly, it will check first
  }
}

class Final_revision { // no type
  public int demo;
  /**
   * <type> <fieldName> (inside class, not method)
   * <type> <methodName>
   * name must start with letter or '_'
   * there MUST be a () following methods
   * 'character', "String"
   * final:constant; non final: variable
   * static: class method/field (global); non static: instance method/field (local)
  */
  
  // Types: int, long, short, float, double, byte, char, boolean
  // float --> 3.14159f (must have f or F)
  // Math.round -> round, otherwise discard decimal
  // Math.ceil/floor ->double
  // xor -> equal:false, diff.:true
  public Final_revision (){ //only have public/private
    // this is a constructor
    // when use in other class, need to create new object
    // only 'new' can create new object
    // can have public/private or no modifier
    
  }
  
  public int someMethod() throws IOException{
    char grade = 'C';
    int gpa;
    switch(grade) { // if grade == case ...
      case 'A': gpa = 1;
      break;
      // many cases...
      default : gpa = 4; // default case
      // execute until end of block or break;
      // if no break, start from the right case run till the end
  }
    return 1;
  }
  
  public static void main (String [ ] args) throws IOException{ // main function
    PrintStream p = System.out;    // use this one to make it easier for printing
    PrintStream printInFile = new PrintStream( "filename.txt" );
    printInFile.println("print something in file");
    Scanner k = new Scanner(System.in);
    File inputFile = new File("filename.txt"); //open file via File new obj
    Scanner scanInFile = new Scanner(new File("filename.txt")); //open file directly
    String line = scanInFile.nextLine();
    someClass obj = new someClass();
    // can use clone() to copy obj.
    obj.someMethod(); // someMethod exception -> need to throws or as below
    try {
      obj.someMethod();
    }
    catch (IOException obj_ref){ // FileNotFoundException
      p.println("demo");
      System.out.println("File not found!");
      System.exit(1);
    }
    catch (ArithmeticException obj_ref){
      p.println("demo");
    }
    // is used without creating obj, put it static
    // can use System.setOut(printInFile); to redirect System.out -> System.out.println becomes print in file
    /**
     * modifiers type methodName( parameters if any){
     * local variable;
     * return ;
     * }
     */
    int a = 'd'; // ASCII
    //\u0041 can use to call char -> Unicode
    int[][] Array_2D = new int[3][3]; // array, initialized with all zero
    int length_of_Array = Array_2D.length; // for String we use string.length();
    // line.charAt() access char at pos
    // when compare, use line.equals(...)
    // can use String.split(",") to separate stings content, split will give string array
    // string.substring(start, end) to find substring inside string
    StringBuilder someString = new StringBuilder("Some text");
    // String.valueOf(make value into char) or Int.praseInt(string)
    // String[] sep = s.split("a");
    //someString.append("...") works here;
    // System.out.println(someString) works also
    
    //printf: %s string; %f float; %d int;
  }
}
/*
Remember use * for multiplication, when compare do it case by case!!!

can override toString by
public String toString() {
    return String.format( stringStyle);
  }

remember to check return
*/

//printf: %d:decimal; %o:octal; %x:hexadecimal; %s:string; %f:float, %+09.2d:with sign, zero padding, field width 9, 2 decimal places