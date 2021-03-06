
-- -----------------------------------------------------
-- Schema 3picgame
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema 3picgame
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `epicgame` DEFAULT CHARACTER SET utf8 ;
USE `epicgame` ;

-- -----------------------------------------------------
-- Table `3picgame`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `epicgame`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(100) NULL,
  `access` TINYINT(2) NULL,
  `phone` VARCHAR(25) NULL,
  `dni` VARCHAR(15) NULL,
  PRIMARY KEY (`idusers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `3picgame`.`locations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `epicgame`.`locations` (
  `idlocations` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(100) NOT NULL,
  `street_number` TINYINT(10) NOT NULL,
  `floor` TINYINT(10) NULL,
  `apartment` VARCHAR(5) NULL,
  `province` VARCHAR(50) NOT NULL,
  `town` VARCHAR(50) NOT NULL,
  `codigo_postal` VARCHAR(45) NULL,
  `users_idusers` INT NOT NULL,
  PRIMARY KEY (`idlocations`),
  INDEX `fk_locations_users_idx` (`users_idusers` ASC) VISIBLE,
  CONSTRAINT `fk_locations_users`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `epicgame`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `3picgame`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `epicgame`.`categories` (
  `idcategories` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idcategories`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `epicgame`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `epicgame`.`products` (
  `idproducts` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(45) NULL,
  `discount` FLOAT NOT NULL,
  `price` FLOAT NOT NULL,
  `description` VARCHAR(100) NULL,
  `name` VARCHAR(100) NULL,
  `rating` TINYINT(10) NULL,
  `categories_idcategories` INT NOT NULL,
  PRIMARY KEY (`idproducts`),
  INDEX `fk_products_categories1_idx` (`categories_idcategories` ASC) VISIBLE,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_idcategories`)
    REFERENCES `epicgame`.`categories` (`idcategories`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `epicgame`.`feedbacks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `epicgame`.`feedbacks` (
  `idfeedbacks` INT NOT NULL AUTO_INCREMENT,
  `rating` TINYINT(10) NULL,
  `commentary` VARCHAR(250) NULL,
  `users_idusers` INT NOT NULL,
  `products_idproducts` INT NOT NULL,
  PRIMARY KEY (`idfeedbacks`),
  INDEX `fk_feedbacks_users1_idx` (`users_idusers` ASC) VISIBLE,
  INDEX `fk_feedbacks_products1_idx` (`products_idproducts` ASC) VISIBLE,
  CONSTRAINT `fk_feedbacks_users1`
    FOREIGN KEY (`users_idusers`)
    REFERENCES `epicgame`.`users` (`idusers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_feedbacks_products1`
    FOREIGN KEY (`products_idproducts`)
    REFERENCES `epicgame`.`products` (`idproducts`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;