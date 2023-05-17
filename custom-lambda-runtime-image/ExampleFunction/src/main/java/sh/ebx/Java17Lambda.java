/**
 * ***********************************************************************
 *
 * ECHOBOX CONFIDENTIAL
 *
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains the property of Echobox Ltd. and its
 * suppliers, if any. The intellectual and technical concepts contained herein are proprietary to
 * Echobox Ltd. and its suppliers and may be covered by Patents, patents in process, and are
 * protected by trade secret or copyright law. Dissemination of this information or reproduction of
 * this material, in any format, is strictly forbidden unless prior written permission is obtained
 * from Echobox Ltd.
 */

 package sh.ebx;

 import com.amazonaws.services.lambda.runtime.Context;
 import com.amazonaws.services.lambda.runtime.RequestHandler;
 
 public class Java17Lambda implements RequestHandler<Object, String> {
   public String handleRequest(Object input, Context context) {
     String text = """
      This is a text block that we want to return from the Lambda function.
      This demonstrates the successful implementation of a custom java 17
      runtime container image.

      Best regards,
      Function
      """;
 
     return text;
   }
 }
