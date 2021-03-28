<?php

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Version details
 *
 * @package    block
 * @subpackage block_recommenda
 * @copyright  
 * @license   
 */
defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/blocks/recommenda/renderer.php');
require_once($CFG->dirroot . '/blocks/recommenda/locallib.php');

class block_recommenda extends block_base {

    public function init() {
        $this->title = get_string('recommenda', 'block_recommenda');
    }

    function has_config() {
        return true;
    }

    public function get_content() {
        global $PAGE, $USER, $CFG;

        if ($this->content !== null) {
            return $this->content;
        }

        $this->content = new stdClass;
        $this->content->items = array();
        $this->content->icons = array();
        $this->content->footer = '';
        $this->content->text = '';

        $this->content->text .= '<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">';
        $this->content->text .= '<script src="https://kit.fontawesome.com/ef79d3f4e6.js" crossorigin="anonymous"></script>';

        if (isset($_POST['submitbutton']) && !empty($_POST['tags'])) {
            useredit_update_interests($USER, $_POST['tags']);
        }
        
        // Array of user tags
        $interests = core_tag_tag::get_item_tags_array('core', 'user', $USER->id, core_tag_tag::BOTH_STANDARD_AND_NOT, 0, false);
        if (empty($interests) || (isset($_POST['acao']) && $_POST['acao'] == 'editinterests') || (isset($_POST['submitbutton']) && empty($_POST['tags']))) {
            $this->content->text .= execute_interests_form($interests);
        } else if (!empty($interests)) {
            $this->content->text = '';

            $this->content->text .= html_writer::start_div('main-block');
            $this->content->text .= '<form id="form_edit_interests" method="post"><div class="relative-container">';
            $this->content->text .= '<input type="hidden" value="editinterests" name="acao" >';
            $this->content->text .= '<a href="javascript:void(0)" class="acao btn btn-outline-secondary" onClick="document.getElementById(\'form_edit_interests\').submit();" title="'.get_string('editinterestsdesc', 'block_recommenda').'"><i class="fa fa-edit fa-1x"></i> '.get_string('editinterests', 'block_recommenda').'</a>';
            $this->content->text .= '</div></form>';
            $final_array = array_keys(organize_interests($interests));
            if (sizeof($final_array) == 0) {
                $this->content->text .= HTML_WRITER::tag('p', get_string('zerocourses', 'block_recommenda'), array('id' => 'enrolled-every-course'));
                return $this->content;
            }
            $this->content->text .= render_html_block($final_array);


            $course_count = "1 " . get_string('coursesshow2', 'block_recommenda') . " " . count($final_array) . " " . get_string('coursesshow3', 'block_recommenda');

            setcookie("secondString", get_string('coursesshow2', 'block_recommenda'));
            setcookie("thirdString", get_string('coursesshow3', 'block_recommenda'));

            $this->content->text .= html_writer::start_div('count-div');
            $this->content->text .= HTML_WRITER::tag('p', $course_count, array('id' => 'course-count'));
            $this->content->text .= html_writer::end_div();

            //print_r2('final array output');
            //print_r2($final_array);
            //$test = print_r($this->content->text, true);
            //echo '<pre>' . htmlentities($test) . '</pre>';

            $this->content->text .= html_writer::end_div();
        }
        $this->content->text .= '
    		<script src="https://cdnjs.cloudflare.com/ajax/libs/eqcss/1.9.2/EQCSS.min.js"></script>';
        $PAGE->requires->jquery();
        $PAGE->requires->js(new moodle_url($CFG->wwwroot . '/blocks/recommenda/js/module.js'));
        $PAGE->requires->js(new moodle_url($CFG->wwwroot . '/blocks/recommenda/js/dotdotdot.js'));

        return $this->content;
    }

}
