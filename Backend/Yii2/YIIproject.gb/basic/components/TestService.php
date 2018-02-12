<?php
/**
 * Created by PhpStorm.
 * User: Akinf
 * Date: 31.10.2017
 * Time: 19:50
 */

namespace app\components;


use yii\base\Component;

class TestService extends Component
{
public $var = 'Переменная';

public function run(){
    return $this->var;
}

}