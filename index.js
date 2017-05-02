var webdriver = require('selenium-webdriver'), By = webdriver.By, until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('chrome').build();
 
var links = [
    "https://www.instagram.com/cars/",
    "https://www.instagram.com/travel/",
    "https://www.instagram.com/eddthepug/",
    "https://www.instagram.com/pugs/",
    "https://www.instagram.com/elonmusk/"
];
 
// Hyjme te faqja dhe logohemi
        driver.get("https://www.instagram.com");
        driver.wait(until.elementLocated(By.className("_fcn8k"))).click().then(function()
{
        driver.findElement(By.name("username")).sendKeys("metellarigjorgjia");
        driver.findElement(By.name("password")).sendKeys("jorgjia1234").then(function()

   {
        driver.findElement(By.className("_ah57t _84y62 _i46jh _rmr7s")).click();
 
        // Presim sa te hapet nje foto te pakten ne feed, pastaj fillojme funksionin rekursiv.
            driver.wait(until.elementLocated(By.className("_ovg3g"))).then(function() 

      {
                function recursive(i) 

        {
 
                // Marrim linkun e pare.
                    driver.get(links[i]);
 
                    // Klikojme foton qe te hapet.
                    driver.wait(until.elementLocated(By.className("_ovg3g"))).click();
 
                    // Presim sa te hapet fotoja (qe ka te njejtin emer klase).
                    driver.wait(until.elementLocated(By.className("_ovg3g"))).then(function() {
                        var nr = Math.floor(Math.random() * 10) + 1;
                          console.log(nr);
                     // Shohim nqs i kemi bere like nje here fotos. Nqs po, kalojme te linku tjeter.
                    function recursive2(j)
                    {

                        driver.wait(until.elementLocated(By.className("coreSpriteRightPaginationArrow"))).then(function()
                        {
                        
                            driver.findElement(By.className("coreSpriteLikeHeartFull")).then(function(found)
                             {
                                setTimeout(function() 
                              {

                             driver.findElement(By.className("coreSpriteRightPaginationArrow")).click().then(function() 
                             {
                                 
                                      j++;
                                        if (j < nr) recursive2(j);
                                         else {
                                             i++;
                                                if (i < links.length) recursive(i);
                                                   else driver.quit();  
                                              }        
                             });
                             }, 5000);  
                            }, function(not_found) 
                            {

                                // Nqs jo, i bejme like tani.
                                driver.wait(until.elementLocated(By.className("coreSpriteLikeHeartOpen"))).click().then(function() 
                                {
                                    console.log("Photo liked now.");
                                      setTimeout(function()
                                     {
                                        driver.findElement(By.className("coreSpriteRightPaginationArrow")).click().then(function()
                                       {
                                        //kjo eshte e shigjetes 
                                          j++;
                                             if (j < nr) recursive2(j);
                                                else {
                                                    i++;
                                                      if (i < links.length) recursive(i);
                                                        else driver.quit();
                                                      }                     
                                        })
                                      }, 5000);  
                               });
                           });
                         });
                   }
                    recursive2(0);
                });
            }
            recursive(0);
        });
    });
});