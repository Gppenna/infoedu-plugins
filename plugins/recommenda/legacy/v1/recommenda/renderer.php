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

require_once("$CFG->libdir/formslib.php");

require_once($CFG->dirroot.'/user/editlib.php');
require_once($CFG->libdir. '/coursecatlib.php');

class interests_form extends moodleform {

    public function definition() {
        global $CFG, $DB;

        $mform = $this->_form; // Don't forget the underscore! 
        $all_tags = get_all_tags();

        if(!empty($all_tags))
        {
            foreach($all_tags as $tag_obj)
            {
                $mform->addElement('checkbox', $tag_obj->id, $tag_obj->rawname);
            }
            $this->add_action_buttons($cancel = false, $submitlabel=get_string('submit', 'block_recommenda'));
        }
 }

 function validation($data, $files) 
 {
    global $USER;

    $validation = array();
    foreach ($data as $key => $value)
    {
        if($data[$key] == 1 && is_numeric($key))
        {
            $tag = core_tag_tag::get($key);
            $validation[] = $tag->rawname;
        }
    }

    if(!empty($validation)){
        useredit_update_interests($USER, $validation);
        return true;
    }
    else
        return false;
}

}

function get_all_tags()
{
    global $DB;

    $all_tags = $DB->get_records('tag', null, $sort='', $fields='*', $limitfrom=0, $limitnum=0);
    return $all_tags;
}


function execute_interests_form()
{
    global $USER, $DB;

    $html = '';
    $html .= html_writer::start_div('form-h4');
    if(!empty(get_all_tags()))
        $html .= html_writer::tag('h4', get_string('nointerests', 'block_recommenda').html_writer::tag('br', ''));
    else
        $html .= html_writer::tag('h4', get_string('zerotags', 'block_recommenda').html_writer::tag('br', ''));

    $html .= html_writer::end_div();

    $html .= html_writer::start_div('form-items');

    $mform = new interests_form();

            //Form processing and displaying is done here
    if ($mform->is_cancelled()) 
    {
                //Handle form cancel operation, if cancel button is present on form
    } 
    else if (count((array)$mform->get_data()) > 1) 
    {
        $interests = core_tag_tag::get_item_tags_array('core', 'user', $USER->id, core_tag_tag::BOTH_STANDARD_AND_NOT, 0, false);
        $final_array = array_keys(organize_interests($interests));
        $html = render_html_block($final_array);
        $html .= html_writer::end_div();
        return $html;
    } 
    else if (count((array)$mform->get_data()) == 1)
    {
        $html .= html_writer::tag('p', get_string('formerror', 'block_recommenda').html_writer::tag('br', ''), array('style' => 'color: red'));
        $mform->set_data(null);
        $html .= $mform->render();
        $html .= html_writer::end_div();
        return $html;
    }
    else
    {
        $mform->set_data(null);
        $html .= $mform->render();
        $html .= html_writer::end_div();
        return $html;
    }
    return false;
}

function render_html_block($final_array)
{
    global $USER, $DB, $CFG, $OUTPUT;

    $temp_html = '';
    $chelper = new coursecat_helper();

    $resize_url = new moodle_url('/blocks/recommenda/css-element-queries/src/ResizeSensor.js');
    $queries_url = new moodle_url('/blocks/recommenda/css-element-queries/src/ElementQueries.js');
    $temp_html .= '
    <script src="'.$resize_url.'"></script>
    <script src="'.$queries_url.'"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jQuery.dotdotdot/4.1.0/dotdotdot.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.js"></script>
    <script
        type="module"
        src="https://cdn.jsdelivr.net/npm/js-cookie@rc/dist/js.cookie.min.mjs"
    ></script>
    ';

$temp_html .= '<div class="bootstrapiso">';
$temp_html .= '<div id = "myCarousel" class="carousel slide" data-ride = "carousel">';


$temp_html .= '<div class="carousel-inner">';

foreach ($final_array as $flag_key => $courseid) 
{
    if($flag_key == 0)
    {
        $temp_html .= '<div class="carousel-item active">';
    }
    else
    {
        $temp_html .= '<div class="carousel-item">';
    }
    $content = $content_images = $content_files = '';

    $course_final = $DB->get_record('course', array('id' => $courseid));

    $course_formatted = new course_in_list($course_final);


    $mobilecourselink = html_writer::link(new moodle_url('/course/view.php', array('id' => $courseid)),$course_final->fullname, array('class' => $course_final->visible ? '' : 'dimmed'));
    $content .= HTML_WRITER::tag('div', $mobilecourselink, array('class' => 'mobile-coursename','title' => $course_final->fullname));
    
    if(empty($course_formatted->get_course_overviewfiles())){
        $img_url = new moodle_url('/blocks/recommenda/img/default-placeholder.png');
        $content_images = html_writer::tag('p',
                html_writer::empty_tag('img', array('src' => $img_url, 'class' => 'indv_img')),
                array('class' => 'courseimage'));
        $content .= $content_images;
    }
    else
        foreach ($course_formatted->get_course_overviewfiles() as $file)
        {
            $is_image = $file->is_valid_image();
            $url = file_encode_url("{$CFG->wwwroot}/pluginfile.php",
                '/'. $file->get_contextid(). '/'. $file->get_component(). '/'.
                $file->get_filearea(). $file->get_filepath(). $file->get_filename(), !$is_image);
            if ($is_image)
            {
                $content_images .= html_writer::tag('p',
                    html_writer::empty_tag('img', array('src' => $url, 'class' => 'indv_img')),
                    array('class' => 'courseimage'));
            }
            else 
            {
                $image = $this->output->pix_icon(file_file_icon($file, 24), $file->get_filename(), 'moodle');
                $filename = html_writer::tag('span', $image, array('class' => 'fp-icon')).
                html_writer::tag('span', $file->get_filename(), array('class' => 'fp-filename'));
                $content_files .= html_writer::tag('span',
                    html_writer::link($url, $filename),
                    array('class' => 'coursefile fp-filename-icon'));
            }
            $content .= $content_images. $content_files;
        }

        $courselink = html_writer::link(new moodle_url('/course/view.php', array('id' => $courseid)),$course_final->fullname, array('class' => $course_final->visible ? '' : 'dimmed'));
        $content .= HTML_WRITER::tag('div', $courselink, array('class' => 'coursename','title' => $course_final->fullname));

        if($course_formatted->has_summary())
        {
            $summary_string = $DB->get_field("course", "summary", array("id"=>$course_final->id));
            $summary_string = format_string($summary_string);

            $content .= '<div class="summary-div"><p class="summary_text">';
            $content .= $summary_string;
            $content .= '</p></div>';
        }

        $temp_html .= $content. '</div>';
    
}

$temp_html .= '</div><a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
<span class="carousel-control-prev-icon" aria-hidden="true"></span>
<span class="sr-only">Previous</span>
</a>
<a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
<span class="carousel-control-next-icon" aria-hidden="true"></span>
<span class="sr-only">Next</span>
</a></div></div>';

return $temp_html;
}